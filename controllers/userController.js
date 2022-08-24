const { User } = require('../db/models/index');

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

module.exports = { getAllUsersGET, deleteUserById, updateUserPATCH }