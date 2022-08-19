const { User } = require('../db/connection');

const getAllUsers = async() => {
    let userData = await User.findAll();
    //devuelvo el array completo de users
    return userData
}


module.exports = {getAllUsers}
