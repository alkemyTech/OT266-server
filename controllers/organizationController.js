const {Organization} = require("../db/models");
const ImageAWS = require("../utils/imageUpload");
const Slides = require("../controllers/slidesController");


exports.listOrganizationpublic = async (req, res) => {
    try {
       
        const slide = await Slides.slideInfoByOrganization(req,res)
        const allOrganizations = await Organization.findOne({
            where: {
                id: req.body.id
            }
        })
        data = {Organziation : allOrganizations , Slides: slide.slideDataByIdOrg }
          res.json(data)
    } catch (error) {
        console.log(error);
    }
};

exports.listOrganization = async (req, res) => {
    try {
        const allOrganizations = await Organization.findAll();
        res.json(allOrganizations)
    } catch (error) {
        console.log(error);
    }
};

exports.createOrganization = async (req, res) => {
    try {
        const data = req.body;
        const newOrganization = await Organization.create(data);
        await newOrganization.save();
    } catch (error) {
        console.log(error);
    }
}

exports.editOrganization = async (req, res) => {
    try {
        const id = req.params;
        await Organization.update(req.body, {
            where: { id }
        });
        res.json('Organization updated successfully');
    } catch (error) {
        console.log(error);
    }
}

exports.deleteOrganization = async (req, res) => {
    try {
        const id = req.params;
        await Organization.destroy({
            where: { id }
        });
        res.json('Organization deleted successfully');
    } catch (error) {
        console.log(error);
    }
}