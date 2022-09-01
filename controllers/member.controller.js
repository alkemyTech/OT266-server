const {Member} = require("../db/models");

exports.listMembers = async (req, res) => {
    try {
        const allMembers = await Member.findAll();
        res.json(allMembers)
    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
};

exports.listMembersAttributes = async (req, res) => {
    try {
        const allMembers = await Member.findAll({
            attributes: ['nameMember', 'image']
        });
        res.json(allMembers)
    } catch (error) {
        return {
            message: error.message,
            success: false
        }
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
        return {
            message: error.message,
            success: false
        }
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
        return {
            message: error.message,
            success: false
        }
    }
}

exports.deleteMember = async (req, res) => {
    try {
        const {id} = req.params;
        const member = await Member.findByPk(id)
        await member.destroy();
        res.json('Member deleted successfully');
    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}