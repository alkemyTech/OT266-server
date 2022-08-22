//import models
const {User} = require('../db/models/index');

//Import helpers
const {hashPassword} = require('../utils/bcryptHelper')

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


module.exports = {authRegisterPOST}