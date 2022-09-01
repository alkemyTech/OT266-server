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


module.exports = {slidesGET}