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


const deleteUserById = async(userId)=>{
    let softDeleteUser = await User.destroy({
        where:{
            id: userId
        }
    })
}


module.exports = {getAllUsers,createUser,deleteUserById}
