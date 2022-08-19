const Members = require("../models/member");

exports.allMembers = async (req, res) => {
    try {
        const members = await Members.findAll();
        res.json(members)
    } catch (error) {
        console.log(error);
    }
};

exports.createMember = async (req, res) => {
    try {
        const data = req.body;
        const newMember = await Members.create(data);
        await newMember.save();
    } catch (error) {
        console.log(error);
    }
}

exports.editMember = async (req, res) => {
    try {
        const id = req.params;
        await Members.update(req.body, {
            where: { id }
        });
        res.json('Member updated successfully');
    } catch (error) {
        console.log(error);
    }
}

exports.deleteMember = async (req, res) => {
    try {
        const id = req.params;
        await Members.destroy({
            where: { id }
        });
        res.json('Member deleted successfully');
    } catch (error) {
        console.log(error);
    }
}