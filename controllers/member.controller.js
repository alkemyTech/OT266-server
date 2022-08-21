const {Member} = require("../db/models");

exports.listMembers = async (req, res) => {
    try {
        const allMembers = await Member.findAll();
        res.json(allMembers)
    } catch (error) {
        console.log(error);
    }
};

exports.createMember = async (req, res) => {
    try {
        const data = req.body;
        const newMember = await Member.create(data);
        await newMember.save();
    } catch (error) {
        console.log(error);
    }
}

exports.editMember = async (req, res) => {
    try {
        const id = req.params;
        await Member.update(req.body, {
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
        await Member.destroy({
            where: { id }
        });
        res.json('Member deleted successfully');
    } catch (error) {
        console.log(error);
    }
}