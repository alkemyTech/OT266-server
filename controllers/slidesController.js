//Models
const { Slides } = require('../db/models/index');


//for http://localhost:3000/slides
const slidesGET = async(req,res) => {
    //Select query
    const activeSlides = Slides.findAll({
        attributes: ['imageUrl','text','order']
    });
    res.send(activeSlides)

}


module.exports = {slidesGET}