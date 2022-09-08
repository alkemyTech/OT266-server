const { request, response } = require("express");
const { News } = require("../db/models");
const Sequelize = require("sequelize");
const { sendEmail } = require("../utils/emailSender");
const Op = Sequelize.Op;
const fs = require('fs');

const { getPagination, getPagingData } = require('../utils/paginator');

// const getAll = async(req = request, res = response) => {
//     let page = null;
//     // FIX: En el caso de que no haya un parametro page, le asigno "0" para que devuelva la primera pegina.
//     req.query.page ? page = req.query.page : page = 0;

//     // Genero el tamaño de elementos. El limite es igual al tamaño. El offset se arma multiplicando
//     // el tamaño por el parametro recibido por query.
//     let size = 10;
    
//     try {
//         const news = await News.findAndCountAll({
//             limit: size,
//             offset: page ? page * size : 0,
//             where: {
//                 softDeleted: false,
//             },
//         });

//         // Genero el "limite" del paginado para utilizar en la funcion siguiente.
//         let limit = Math.floor(news.count / size);

//         // Valido si el numero de pagina es mayor al limite, si es asi, devuelvo null, de lo contrario,
//         // almaceno el string de la pagina previa.
//         let next = (Number(page) + 1 > limit) 
//             ? null 
//             : `http://localhost:3000/news?page=${Number(page)+1}`;

//         // Valido si el numero de pagina es menor a cero, si es asi, devuelvo null, de lo contrario,
//         // almaceno el string de la pagina previa.
//         let prev = (Number(page) - 1 < 0) 
//             ? null 
//             : `http://localhost:3000/news?page=${Number(page)-1}`;

//         return res.status(200).json({
//             news: news.rows,
//             prev,
//             next
//         });

//     } catch (error) {
//         return res.status(400).json({
//             error: error,
//         });
//     }
// };


const getAll = async(req = request, res = response) => {
    const { page = 1, size = 10 } = req.query;

    const { limit, offset } = getPagination(page, size);
    
    try {
        const news = await News.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
                softDeleted: false,
            },
        });

        const response = getPagingData(news, page, limit, "news");
       
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

        if(news){

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

module.exports = {
    getAll,
    getById,
    createNews,
    putNews,
    deleteNews,
};