const {Slide} = require('../db/models/index')


//for http://localhost:3000/slides
const slidesGET = (req,res) => {
    res.send('all active slides')
}


module.exports = {slidesGET}