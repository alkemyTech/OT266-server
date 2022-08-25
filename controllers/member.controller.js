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
        const { nameMember, facebookUrl, instagramUrl, linkedinUrl, image, description } = req.body;
        const newMember = await Member.create({
            nameMember,
            facebookUrl,
            instagramUrl,
            linkedinUrl,
            image,
            description
        });
        await newMember.save();
        res.json('Member created successfully');
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
        const {id} = req.params;
        const member = await Member.findByPk(id)
        await member.destroy();
        res.json('Member deleted successfully');
    } catch (error) {
        console.log(error);
    }
}