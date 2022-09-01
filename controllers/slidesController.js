//Models
const { Slides } = require('../db/models/index');


//for http://localhost:3000/slides
const slidesGET = async(req,res) => {
    //Select query
    const activeSlides = Slides.findAll({
        attributes: ['imageUrl','order']
    });
    res.send(activeSlides)

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

module.exports = {slidesGET,slideInfoById,slideUpdateById,deleteUserById}