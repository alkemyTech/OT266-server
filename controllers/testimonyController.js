const { request, response } = require("express");
const {Testimony} = require("../db/models");
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


const testimonyGet = async (req = request, res = response) => {

    try {
        const testimonies = await Testimony.findAll({
            where: {
                softDeleted: false
            }
        }); 

        return res.status(200).json({
            testimonies: testimonies
        });

    } catch (error) {
        return res.status(400).json({
            error : error
        })
    }

}


const testimonyGetOne = async (req = request, res = response) => {   
    
    const {id} = req.params;

    try {
        const testimony = await Testimony.findOne({
            where: {
                id: id,
                softDeleted: false
            }
        })
    
        res.status(200).json({
            testimony : testimony,
        })

    } catch (error) {
        res.status(400).json({
            error : error
        })
    }
}


const testimonyPost = async (req = request, res = response) => {

    const {
            name, 
            content, 
            image, 
        } = req.body;

    const softDeleted = false;

    const newTestimony = new Testimony({
        name,
        content,
        image
    })

    try {
        await newTestimony.save()
        return res.status(201).json({
            testimony: newTestimony
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
    
}


const testimonyPut = async (req = request, res = response) => {

    const {id} = req.params;

    const {
        name, 
        description, 
        image
    } = req.body;

    const updatedTestimony = {
        name,
        description,
        image
    }

    try {
        const testimony = await Testimony.findByPk(id)
        
        if(!testimony){
            return res.status(404).json({
                msg:`testimony not found ${id}`
            })
        }

        await testimony.update(updatedTestimony);

        return res.status(200).json({
            testimony: testimony
        })

    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }

}


//virtual DELETE
const testimonyDelete = async (req = request, res = response) => {
    
    const {id} = req.params;
    
    const updatedTestimony = {
        softDeleted:1
    }

    try {
        const testimony = await testimony.findByPk(id)
        
        if(!testimony){
            return res.status(404).json({
                msg:`testimony not found ${id}`
            })
        }

        await testimony.update(updatedTestimony);

        return res.status(200).json({
            testimony: testimony
        })

    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}

//phisical DELETE
const testimonyPhisicalDelete = async (req = request, res = response) => {
    
    const {id} = req.params;
    
    try {
        const testimony = await testimony.findByPk(id)
        
        if(!testimony){
            return res.status(404).json({
                msg:`testimony not found ${id}`
            })
        }

        await testimony.destroy();

        return res.status(200).json({
            msg: 'testimony Deleted'
        })

    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}


module.exports = {
    testimonyGet,
    testimonyGetOne,
    testimonyPost,
    testimonyPut,
    testimonyDelete,
}