const { request, response } = require("express");
const {Category} = require("../db/models");
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


const categoryGet = async (req = request, res = response) => {

    let currentPage = Number(req.query.page) || 0;
    let offsetForQuery = (currentPage * 10);

        const allCategories = await Category.findAll({
            limit:10,
            offset: offsetForQuery,
            where: {
                softDeleted: false
            },
            order:  [['id', 'ASC']],
        }); 

        //Logic for page links
        const countCategories = await Category.count({
            where: {
                softDeleted: false
            }
        })
        //To know how many pages i need, the count of categories row / 10.
        const pagesAvailable = Math.floor((countCategories / 10))
        console.log('pageAvaib:', pagesAvailable)
        console.log(`cuenta de rows:${countCategories} y la cantidad de paginas disponibles: ${pagesAvailable}`)

        //Get array of pages with content
        let pagesWithContent = [];
        for (let i = 0; i <= pagesAvailable; i++) {
            pagesWithContent.push(i)
        }
        //Al pages with content saved in an array called pages.
        console.log('push after for: ', pagesWithContent)

        //New array just with middle pages with content
        let middlePagesWithContent = [];
        for (let i = 1; i < pagesAvailable; i++) {
            middlePagesWithContent.push(i)
        }
        console.log('middlepages:', middlePagesWithContent)

        //Get array with 3 pages: previous,current,next
        let pages = [];
        //push into array for reference
        if(currentPage == 0){
            pages.push((currentPage));
            pages.push((currentPage + 1));
        } else if(middlePagesWithContent.includes(currentPage)){
            pages.push((currentPage - 1));
            pages.push((currentPage));
            pages.push((currentPage + 1));
        } else if(currentPage == pagesAvailable){
            pages.push((currentPage - 1));
            pages.push((currentPage));
        }

        dataForRes = {
            allCategories,
            pagesWithContent,
            pages
        }
        //If search by param gets no results == array allCategories is 0.
        if(allCategories.length == 0){
            res.send(dataForRes)
        }else if(allCategories.length > 0){
            res.status(200).send(dataForRes);
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