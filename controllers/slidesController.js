//Models
const { Slides } = require('../db/models/index');

//Import modules
const fs = require('fs')

//Import utils
const  {uploadFile} = require('../utils/imageUpload2')


//for GET-> http://localhost:3000/slides
const slidesGET = async(req,res) => {
    //Select query
    const activeSlides = await Slides.findAll({
        attributes: ['imageUrl','order']
    });
    res.send(activeSlides)

}








//for POST ->http://localhost:3000/slides
const slidesPOST = async(req,res) => {
    //Inputs required: imageBase64? , text(varchar),order(int),organizationId
        let {imageBase64,text,order,organizationId} = req.body;
    //imageBase64 would be: data:image/jpeg;base64,/9j/4AAQSkZJRgA.....
    // The image data is after the ","  /9j/4AAQSkZJRgA..

    //Get important image data
        let imageExtension = imageBase64.split(';')[0].split('/')[1];
        let imageData = imageBase64.split(',')[1]
    //Name the file
        let fileNameToSave = `image-${Date.now()}.${imageExtension}`
    //Create file with the data; and save it at root/utils/temporaryImages
        fs.writeFile(`./utils/temporaryImages/${fileNameToSave}`,imageData,{encoding:'base64'}, function(error){
            if(error){
                console.log('Error creando imagen: ', error)
            }
        })
        //Upload image, using same path from the writeFile and same name
        let uploadImage = await uploadFile(fileNameToSave);
        /* 
            Respuesta de uploadImage:
            {
                ETag: '"f20e857a14c683ec8f9adbc6322aaf01"',
                Location: 'https://cohorte-agosto-38d749a7.s3.amazonaws.com/image-1662133101246.jpeg',
                key: 'image-1662133101246.jpeg',
                Key: 'image-1662133101246.jpeg',
                Bucket: 'cohorte-agosto-38d749a7'
            }
        */

    res.json({imageExtension,imageData})
}







//for GET-> http://localhost:3000/slides/:id
const slideInfoById = async(req,res) => {
    let id = Number(req.params.id) || 0;

    //findByPk query with params id, if exits send all data, if it does not exist send 404 error
    let slideDataById = await Slides.findByPk(id)
    //Res send data
    res.json(slideDataById)
}

//for PUT-> http://localhost:3000/slides/:id
const slideUpdateById = async(req,res) => {
    let slideId = Number(req.params.id);

    //Need inputs: text, order, organizationId, imageUrl
    let { text, order, organizationId, imageUrl } = req.body;

    //Check every input, if is undefined doesnt go to the query
    let updateSlideData = {}
    if (text != undefined) { updateSlideData.text = text };
    if (order != undefined) { updateSlideData.order = order };
    if (organizationId != undefined) { updateSlideData.organizationId = organizationId };
    if (imageUrl != undefined) { updateSlideData.imageUrl = imageUrl };

    try {
        //Update query
        let updateSlide = await Slides.update(
            updateSlideData, {
                where: {
                    id: slideId
                }
            }
        )
        //Get the updated info
        let updatedSlide = await Slides.findByPk(slideId);
        //Send response
        res.json({"Update Status":"OK","Updated Data:":updatedSlide})
    } catch (error) {
        console.log('Error en el update de Slide: ', error)
    }
}

//for DELETE-> http://localhost:3000/slides/:id
const deleteUserById = async(req, res) => {
    //First id via param
    let slideId = Number(req.params.id);

    //Destroy query for delete
    try {
        let softDeleteSlide = await Slides.destroy({
            where: {
                id: slideId
            }
        })
        res.send(`deleted slide with id: ${slideId}`)
    } catch (error) {
        console.log('Error delete slide: ', error)
    }
}

module.exports = {slidesGET,slidesPOST,slideInfoById,slideUpdateById,deleteUserById}