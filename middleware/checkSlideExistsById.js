//importo modelos
const {Slides} = require('../db/models/index')

const checkSlideExistsById = async(req,res,next) => {
    //Guardo el id del parametro
    let id = Number(req.params.id)||0;

    //Get all active Slides and save them in an array.
    let arraySlidesId = await Slides.findAll({
        attributes: ['id'],
        raw : true
    }) // Response of query: [ { id: 1 }, { id: 10 }, { id: 11 }, { id: 12 } ]
    .then(lista => lista.map(clave => clave.id))
    //console.log(arraySlidesId) --> Response: [ 1, 10, 11, 12 ]

    //If array arraySlidesId includes id: next, else 404
    if(arraySlidesId.includes(id)){
        next()
    }else{
        return res.status(404).json({
            error:'Slide does not exist',
            message:`The slide with id: ${id} is not active/does not exist`
        })
    }
}

module.exports = {checkSlideExistsById}