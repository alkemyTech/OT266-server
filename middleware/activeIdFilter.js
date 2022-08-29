//importo modelos
const {User} = require('../db/models/index')

const activeIdFilter = async(req,res,next) => {
    //Guardo el id del parametro
    let id = Number(req.params.id);

    //Consigo todos los ids activos en la BD y lo guardo en un array.
    let arrayUsersId = await User.findAll({
        attributes: ['id'],
        raw : true
    }) // Respuesta de la query: [ { id: 1 }, { id: 10 }, { id: 11 }, { id: 12 } ]
    .then(lista => lista.map(clave => clave.id))
    //console.log(arrayUsersId) --> Devuelve: [ 1, 10, 11, 12 ]

    //Hago condicion: si el array arrayUsersId incluye el id del parametro: next, sino devuelvo error
    if(arrayUsersId.includes(id)){
        next()
    }else{
        return res.status(404).json({
            error:'User does not exist',
            message:"The id param is not active"
        })
    }
}

module.exports = {activeIdFilter}