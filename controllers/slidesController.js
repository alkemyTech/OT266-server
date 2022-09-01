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

module.exports = {slidesGET,slideInfoById}