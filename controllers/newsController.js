const { request, response } = require("express");
const { News, Comment, User } = require("../db/models");
const Sequelize = require("sequelize");
const { sendEmail } = require("../utils/emailSender");
const Op = Sequelize.Op;
const fs = require('fs');

const { getUrl, getPagination, getPagingData } = require('../utils/paginator');
const user = require("../db/models/user");

const getAll = async(req = request, res = response) => {
    const { page = 1, size } = req.query;
    
    let url = getUrl(req);

    const { limit, offset } = getPagination(page, size, req.body);

    try {
        const news = await News.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
                softDeleted: false,
            },
        });

        const response = getPagingData(news, page, limit, url);

        return res.status(200).json({
            response
        });


    } catch (error) {
        return res.status(500).json({
            error: error,
        });
    }
};


const getById = async(req = request, res = response) => {
    const { id } = req.params;


    try {
        const news = await News.findOne({
            where: {
                id: id,
                softDeleted: false,
            },
        });

        if (news) {

            res.status(200).json({
                news: news,
            });
        } else {
            res.status(404).json({
                message: 'News not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error,
        });
    }
};

const createNews = async(req = request, res = response) => {
    const { name, content, image, type } = req.body;

    const softDeleted = false;

    const createdNews = new News({
        name,
        content,
        image,
        type,
        softDeleted,
    });

    try {
        await createdNews.save();
        return res.status(201).json({
            news: createdNews,
        });
    } catch (error) {
        return res.status(400).json({
            error: error,
        });
    }
};

const putNews = async(req = request, res = response) => {
    const { id } = req.params;

    const { name, content, image, type } = req.body;

    if(!name || !content || !image || !type) return res.status(400).json({message: 'Fields can\'t be empty'}) 

    const updatedNews = {
        name,
        content,
        image,
        type,
    };

    try {
        const news = await News.findByPk(id);

        if (!news) {
            return res.status(404).json({
                msg: `news not found ${id}`,
            });
        }

        await news.update(updatedNews);

        return res.status(200).json({
            news: news,
        });
    } catch (error) {
        return res.status(400).json({
            error: error,
        });
    }
};

//virtual DELETE
const deleteNews = async(req = request, res = response) => {
    const { id } = req.params;

    const updatedNews = {
        softDeleted: true,
    };
  
    try {
        const news = await News.findByPk(id);
        
        if (!news) {
            return res.status(404).json({
                msg: `news with id ${id} not found`,
            });
        }

        await news.update(updatedNews);

        return res.status(200).json({
            msg: `new with id ${id} deleted successfully`
        });
    } catch (error) {
        return res.status(400).json({
            error: error,
        });
    }

};

//phisical DELETE
const phisicalDelete = async(req = request, res = response) => {
    const { id } = req.params;

    try {
        const news = await News.findByPk(id);

        if (!news) {
            return res.status(404).json({
                msg: `news not found ${id}`,
            });
        }

        await news.destroy();

        return res.status(200).json({
            msg: "News Deleted",
        });
    } catch (error) {
        return res.status(400).json({
            error: error,
        });
    }
};

const getNewsComments = async(req, res) => {
    const id = req.params.id;
    try {
        const newsExists = await News.findByPk(id);

        if (!newsExists) {
            return res.status(404).json({
                msg: `news not exist ${id}`,
            });
        }

        const comments = await Comment.findAll({
            include: [{
                    model: User,
                    as: "user",
                    attributes: ['firstName']
                },
                {
                    model: News,
                    as: "news",
                    attributes: ['name']
                }
            ],
            where: {
                news_id: id
            },
            attributes: ['body', 'updatedAt'],
        });
        res.status(200).json({
            comments: comments
        });
    } catch (error) {
        return res.status(400).json({
            error: error,
        });
    }
}

module.exports = {
    getAll,
    getById,
    createNews,
    putNews,
    deleteNews,
    getNewsComments
};