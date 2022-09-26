const {Member} = require("../db/models");

/**
 * * functions to show the members per pages.
 */
const { getUrl, getPagination, getPagingData } = require('../utils/paginator');

/**
 * * function that show the members per pages.
 */
exports.listMembers = async (req, res) => {

    const { page = 1, size } = req.query;
    
    let url = getUrl(req);

    const { limit, offset } = getPagination(page, size, req.body);

    //block try catch; try to work with some instructions, catch to return an mistake in case it exists
    try {
        //Instruction to find and show all the members in the database by pages 
        const allMembers = await Member.findAndCountAll({
            limit: limit,
            offset: offset
        });

        const response = getPagingData(allMembers, page, limit, url);
        //Response
        return res.status(200).json({
            response
        });
    } catch (err) { res.status(500).json(err); }
};

/**
 * * function that show some attributes of the members.
 */
exports.listMembersAttributes = async (req, res) => {
    //block try catch; try to work with some instructions, catch to return an error in case it exists
    try {
        //Instruction to find some attributes of the members in the database
        const allMembers = await Member.findAll({
            attributes: ['nameMember', 'image']
        });
        //response
        res.json(allMembers)
    } catch (err) { res.status(500).json(err); }
};

/**
 * * function to create a member.
 */
exports.createMember = async (req, res) => {
    //block try catch; try to work with some instructions, catch to return an mistake in case it exists
    try {
        //data of the new member
        const { nameMember, facebookUrl, instagramUrl, linkedinUrl, image, description } = req.body;
        //condition to ensure about the type of the data
        if(typeof(nameMember) != 'string'){
            res.status(400).json({msg: 'The name must to be a string'});
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
        res.status(201).json({ msg: 'Member created successfully' });
    } catch (err) { res.status(500).json(err); }
}

/**
 * * function to edit the information a member's information.
 */
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
            res.status(404).json({ msg: "Member doesn't exist" });
        }
        //instruction to update the information of the member
        await member.update(dataToUpdate);
        //response
        return res.status(200).json({
            member: member
        })
    } catch (err) { res.status(500).json(err); }
}

/**
 * * function to delete a member.
 */
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
            res.status(404).json({ msg: "Member doesn't exist" });
        }
        //instruction to delete the member of the database
        await member.destroy();
        //response
        return res.status(200).json({
            member: member
        })
    } catch (err) { res.status(500).json(err); }
}