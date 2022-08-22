//import models
const {User} = require('../db/models/index');

//Import helpers
const {hashPassword,comparePassword} = require('../utils/bcryptHelper')

//Register
const authRegisterPOST = async (req,res) => {
    let { firstName, lastName, email, password } = req.body;

    try {
        //Hash password - Sync
        let passwordHashed = hashPassword(password);
        console.log(passwordHashed);

        //Create new user
        let newUser = await User.create({
            firstName,
            lastName,
            email,
            password: passwordHashed
        })

        res.send(`User creado ${JSON.stringify(newUser)}`)
    } catch (error) {
        res.json(error)
    }
}

//Login
const authLoginGET = async (req,res) => {
    res.send('login GET form page')
}
const authLoginPOST = async (req,res) => {
    /*
Deberá validarse el envío de los campos email y password en la petición, y desencriptar la contraseña para autenticarse
Validar email y password en petición
Verificar si existe usuario con el email solicitado
Si existe, comparar contraseña encriptada con contraseña enviada en petición
    */
    let {email,password} = req.body;

    //Busco email
    const searchUser = await User.findOne({
        where: {
            email: email
        }
    })

    //searchUser == null : no existe el usuario, else si existe
    if (searchUser == null) {
        res.send('{ok: false}, No existe user')
    } else {
        //De la busqueda searchUser, saco el hash de la password.
        let hashedPass = searchUser.password
        //Hago la comparacion de la pass introducida y el hash
        let isPass = comparePassword(password,hashedPass)

        console.log('comprobacion:', isPass)
        res.send('Todo Ok:')
    }

}

module.exports = {authRegisterPOST,authLoginGET, authLoginPOST}