const { User } = require('../db/connection');

const getAllUsers = async() => {
    let userData = await User.findAll();
    //devuelvo el array completo de users
    return userData
};

const createUser = async(r)=>{
    //Need inputs: firstName, lastName, email, password, photo?(null)
    let { firstName, lastName, email, password } = r;

    let newUser = await User.create({
        firstName,
        lastName,
        email,
        password
    })
}

const updateUserPATCH = async (req,res) => {
    let userId = Number(req.params.id);

    //Need inputs: firstName, lastName, email, password, photo?(null)
    let { firstName, lastName, email, password } = req.body;

    //Chequeo cada input, si alguno es undefined, no lo mando en la query, el parametro de la query es {firstanme: x}
    let updateData = {}
    if(firstName != undefined) {updateData.firstName = firstName};
    if(lastName != undefined) {updateData.lastName = lastName};
    if(email != undefined) {updateData.email = email};
    if(password != undefined) {updateData.password = password};

    try {
        let updateUser = await User.update(
            updateData,
            {
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


const deleteUserById = async(userId)=>{
    let softDeleteUser = await User.destroy({
        where:{
            id: userId
        }
    })
}

module.exports = {getAllUsers,createUser,deleteUserById, updateUserPATCH}