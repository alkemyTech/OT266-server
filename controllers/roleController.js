const {Role} = require("../db/models");

exports.listRole = async (req, res) => {
    try {
        const allRoles = await Role.findAll();
        res.json(allRoles)
    } catch (error) {
        console.log(error);
    }
};

exports.createRole = async (req, res) => {
    try {
        const data = req.body;
        const newRole = await Role.create(data);
        await newRole.save();
    } catch (error) {
        console.log(error);
    }
}

exports.editRole = async (req, res) => {
    try {
        const id = req.params;
        await Role.update(req.body, {
            where: { id }
        });
        res.json('Role updated successfully');
    } catch (error) {
        console.log(error);
    }
}

exports.deleteRole = async (req, res) => {
    try {
        const id = req.params;
        await Role.destroy({
            where: { id }
        });
        res.json('Role deleted successfully');
    } catch (error) {
        console.log(error);
    }
}