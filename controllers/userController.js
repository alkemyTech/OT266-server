const { User } = require('../db/models/index');


const createUserPOST = async(req, res) => {
    //Need inputs: firstName, lastName, email, password, photo?(null)
    let { firstName, lastName, email, password } = req.body;

    try {
        let newUser = await User.create({
            firstName,
            lastName,
            email,
            password
        })
        let html = await fs.readFileSync('./utils/emailTemplates/plantilla_email.html','utf8', (err, data) => {
            if (err) throw err;
            return data;
        });
        
        sendEmail(email, 'Registración exitosa', 'Gracias por formar parte de nuestra organización.', html);
  

        res.send('Usuario creado')
    } catch (error) {
        console.log('Error en la creacion: ', error)
    }
}



const getAllUsersGET = async(req, res) => {
    let userData = await User.findAll();
    //Teniendo el paranoid, ya muestra directamente los deletedAt =null
    res.send(userData);
};

const updateUserPATCH = async(req, res) => {
    let userId = Number(req.params.id);

    //Need inputs: firstName, lastName, email, password, photo?(null)
    let { firstName, lastName, email, password } = req.body;

    //Chequeo cada input, si alguno es undefined, no lo mando en la query, el parametro de la query es {firstanme: x}
    let updateData = {}
    if (firstName != undefined) { updateData.firstName = firstName };
    if (lastName != undefined) { updateData.lastName = lastName };
    if (email != undefined) { updateData.email = email };
    if (password != undefined) { updateData.password = password };

    try {
        let updateUser = await User.update(
            updateData, {
                where: {
                    id: userId
                }
            }
        )
        res.send('User actualizado correctamente')
    } catch (error) {
        console.log('Error en el update: ', error)
    }
}

const deleteUserById = async(req, res) => {
    let userId = Number(req.params.id);

    try {
        let softDeleteUser = await User.destroy({
            where: {
                id: userId
            }
        })
        res.send(`deleted user with id: ${userId}`)
    } catch (error) {
        console.log('Error en delete: ', error)
    }

}

//Funcion auxiliar: si existe el email en la DB user devuelve true, sino se devuelve false
const checkEmailExists = async (email) =>{
    let respuesta;
    //Busco email para comprobar si existe en la DB
    const searchUserEmail = await User.findOne({
        where: {
            email: email
        }
    })
    //searchUser == null : no existe el usuario, else si existe
    if (searchUserEmail == null) {
        return false
    } else {
        return true
    }
    
}

module.exports = { getAllUsersGET, deleteUserById, updateUserPATCH, checkEmailExists }