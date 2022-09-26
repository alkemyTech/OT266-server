//import models
const { token } = require('morgan');
const {User} = require('../db/models/index');

//Import helpers
const {checkEmailExists} = require("./userController")
const {hashPassword,comparePassword} = require('../utils/bcryptHelper')
const { signToken7d, verifyToken } = require('../utils/jwtHelper');
const { sendEmail } = require('../utils/emailSender');


//Register
const authRegisterGET = async (req,res) => {
    res.status(200).send('Peticion GET a /auth/register -> Aqui form con campos: firstName,lastName,email,password')
}
const authRegisterPOST = async (req,res) => {
    let { firstName, lastName, email, password } = req.body;

    //If any input is undefined send 401
    if( firstName == undefined || lastName == undefined || email == undefined || password == undefined){
        return res.status(400).json({"Error":"One or more invalid inputs"})
    }

    let existeEmail = await checkEmailExists(email)

    //Si existeEmail es true, existe el user en la DB y hay que devolver que el correo ya existe.
    //Caso contrario, se hace el insert en la DB
    if(existeEmail == true){
        res.status(409).json({'Error message':'Email already registered'})
    } else {
        try {
            //Hash password - Sync
            let passwordHashed = hashPassword(password);
            //console.log(passwordHashed);
    
            //Create new user, asigno automaticamente rol 2: usuario regular
            let newUser = await User.create({
                firstName,
                lastName,
                email,
                password: passwordHashed,
                roleId: 2
            })
            
            //Se envia correo de bienvenida
            sendEmail(email, 'Registración exitosa', `Gracias ${firstName} por tu registro.`);

            //Se crea un jwt como usuario autenticado.
                //Armo objeto con informacion para firmar token: id,name,rol
                    let dataForToken = {
                        id: newUser.id,
                        name: newUser.firstName,
                        rol:newUser.roleId
                    }        
                //Firmo token
                    let JWT = await signToken7d(dataForToken)

            res.status(201).send(`User creado ${JSON.stringify(newUser)}, JWT post registro: ${JWT}`)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

//Login
const authLoginGET = async (req,res) => {
    res.status(200).json({'Respuesta':'Peticion GET a /auth/login -> Aqui form con campos: email,password'})
}

const authLoginPOST = async (req,res) => {
    let {email,password} = req.body;
    //If there is not email / not password send status 400 with error 
    if(email == undefined){
        return res.status(401).json({"Error message:": "Not email found"})
    }
    if( password == undefined){
        return res.status(401).json({"Error message:": "Not password found"})
    }
    //Busco email
    const searchUser = await User.findOne({
        where: {
            email: email
        }
    })

    //searchUser == null : no existe el usuario, else si existe
    if (searchUser == null) {
        res.status(401).json({"Error message:": "Not email found"})
    } else {
        //De la busqueda searchUser, saco el hash de la password.
        let hashedPass = searchUser.password
        //Hago la comparacion de la pass introducida y el hash
        let isPass = comparePassword(password,hashedPass)
        //console.log('comprobacion:', isPass)

        if (isPass == true) {
            //La password introducida es correcta

            //Armo objeto para firmar token: id,name,rol
            let dataForToken = {
                id: searchUser.id,
                name: searchUser.firstName,
                email: searchUser.email,
                rol:searchUser.roleId
            }

            //Firmo token
            let JWT = await signToken7d(dataForToken)

            res.status(200).json({"Email":searchUser.email,"Password":isPass,"JWT Token": JWT})
        } else {
            //Password introducida es incorrecta
            res.status(401).json({"Email":searchUser.email,"Password":isPass})
        }
    }
}

// Function to bring the information of an specific user
const authMyInfoGET = async (req,res) => {

    // Searches the user and return only some fields
    const searchUser = await User.findOne({
        attributes: ['firstName', 'lastName', 'email', 'image'],
        where: {
            id: res.locals.userId,
        },
    })

    // Returns the object with the user info
    res.json(searchUser);
}

module.exports = {authRegisterGET,authRegisterPOST,authLoginGET, authLoginPOST,authMyInfoGET}