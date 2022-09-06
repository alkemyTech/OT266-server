const {Member} = require("../db/models");

exports.listMembers = async (req, res) => {
    //block try catch; try to work with some instructions, catch to return an mistake in case it exists
    try {
        //Instruction to find all the members in the database
        const allMembers = await Member.findAll();
        //Response
        res.json(allMembers)
    } catch (mistake) {
        //to print the mistake
        return {
            message: mistake.message,
            success: false
        }
    }
};

exports.listMembersAttributes = async (req, res) => {
    //block try catch; try to work with some instructions, catch to return an error in case it exists
    try {
        //Instruction to find some attributes of the members in the database
        const allMembers = await Member.findAll({
            attributes: ['nameMember', 'image']
        });
        //response
        res.json(allMembers)
    } catch (mistake) {
        //to print the mistake
        return {
            message: mistake.message,
            success: false
        }
    }
};

exports.createMember = async (req, res) => {
    //block try catch; try to work with some instructions, catch to return an mistake in case it exists
    try {
        //data of the new member
        const { nameMember, facebookUrl, instagramUrl, linkedinUrl, image, description } = req.body;
        //condition to ensure about the type of the data
        if(typeof(nameMember) != 'string'){
            res.json({msg: 'The name must to be a string'});
        }
        //Instruction to create a member in the database
        const newMember = await Member.create({
            nameMember,
            facebookUrl,
            instagramUrl,
            linkedinUrl,
            image,
            description
        });
        //instruction to save the new member in the data base
        await newMember.save();
        //response
        res.json('Member created successfully');
    } catch (mistake) {
        //to print the mistake
        return {
            message: mistake.message,
            success: false
        }
    }
}

exports.editMember = async (req, res) => {
    //instruction to obtain and save the id of the member
    const {id} = req.params;
    //data to be updated
    let { nameMember, facebookUrl, instagramUrl, linkedinUrl, image, description } = req.body;

    //object to store the new date
    let dataToUpdate = {}
    //validations
    if (nameMember != undefined) { dataToUpdate.nameMember = nameMember };
    if (facebookUrl != undefined) { dataToUpdate.facebookUrl = facebookUrl };
    if (instagramUrl != undefined) { dataToUpdate.instagramUrl = instagramUrl };
    if (linkedinUrl != undefined) { dataToUpdate.linkedinUrl = linkedinUrl };
    if (image != undefined) { dataToUpdate.image = image };
    if (description != undefined) { dataToUpdate.description = description };
    
    //block try catch; try to work with some instructions, catch to return an mistake in case it exists
    try {
        //instruction to find the member in the database with the primary key (id)
        const member = await Member.findByPk(id);
        //validation to ensure that the member exists
        if (!member) {
            //response
            res.json({ msg: "Member doesn't exist" });
        }
        //instruction to update the information of the member
        await member.update(dataToUpdate);
        //response
        return res.status(200).json({
            member: member
        })

    } catch (mistake) {
        //to print the mistake
        return {
            message: mistake.message,
            success: false
        }
    }
}

exports.deleteMember = async (req, res) => {
    //block try catch; try to work with some instructions, catch to return an mistake in case it exists
    try {
        //instruction to obtain and save the id of the member
        const {id} = req.params;
        //instruction to find the member in the database with the primary key (id)
        const member = await Member.findByPk(id);
        //validation to ensure that the member exists
        if (!member) {
            //response
            res.json({ msg: "Member doesn't exist" });
        }
        //instruction to delete the member of the database
        await member.destroy();
        //response
        res.json({ msg: 'Member deleted successfully' });
    } catch (mistake) {
        //to print the mistake
        return {
            message: mistake.message,
            success: false
        }
    }
}