const { request, response } = require("express");
const {Category} = require("../db/models");
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

//Import utils
const { getUrl, getPagination, getPagingData } = require('../utils/paginator');


const categoryGet = async (req, res) => {

    const { page = 1, size } = req.query;
    
    let url = getUrl(req);

    const { limit, offset } = getPagination(page, size, req.body);

    try {
        const allCategories = await Category.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
                softDeleted: false
            },
            order:  [['id', 'ASC']],
        }); 

        const response = getPagingData(allCategories, page, limit, url);

        return res.status(200).json({
            response
        });

    } catch (error) {
        return res.status(500).json({
            error: error,
        });
    }
}

const categoryGetOne = async (req = request, res = response) => {   
    
    const {id} = req.params;

    try {
        const category = await Category.findOne({
            where: {
                id: id,
                softDeleted: false
            }
        })

        if(!category){
            return res.status(404).json({
                msg: `category ${id} not found`
            })
        }
    
        return res.status(200).json({
            category : category,
        })

    } catch (error) {
        return res.status(400).json({
            error : error
        })
    }
}


const categoryPost = async (req = request, res = response) => {

    const {
            name, 
            description, 
            image, 
        } = req.body;

    const softDeleted = false;

    const newCategory = new Category({
        name,
        description,
        image,
        softDeleted
    })

    try {
        await newCategory.save()
        return res.status(201).json({
            category: newCategory
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
    
}


const categoryPut = async (req = request, res = response) => {

    const {id} = req.params;

    const {
        name, 
        description, 
        image
    } = req.body;

    const updatedCategory = {
        name,
        description,
        image
    }

    try {
        const category = await Category.findByPk(id)
        
        if(!category){
            return res.status(404).json({
                msg:`category ${id} not found `
            })
        }

        await category.update(updatedCategory);

        return res.status(200).json({
            category: category
        })

    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }

}


//virtual DELETE
const categoryDelete = async (req = request, res = response) => {
    
    const {id} = req.params;
    
    const updatedCategory = {
        softDeleted:true
    }
    
    try {
        const category = await Category.findByPk(id)
        
        if(!category){
            return res.status(404).json({
                msg:`category ${id} not found`
            })
        }

        await category.update(updatedCategory);


        return res.status(200).json({
            category: category
        })

    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}

//phisical DELETE
const categoryPhisicalDelete = async (req = request, res = response) => {
    
    const {id} = req.params;
    
    try {
        const category = await category.findByPk(id)
        
        if(!category){
            return res.status(404).json({
                msg:`category ${id} not found`
            })
        }

        await category.destroy();

        return res.status(200).json({
            msg: 'category Deleted'
        })

    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}


module.exports = {
    categoryGet,
    categoryGetOne,
    categoryPost,
    categoryPut,
    categoryDelete,
}