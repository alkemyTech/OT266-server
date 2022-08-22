const { request, response } = require("express");
const { News } = require("../db/models");
const Sequelize = require("sequelize");
const { sendEmail } = require("../utils/emailSender");
const Op = Sequelize.Op;

const getAll = async (req = request, res = response) => {
  try {
    const news = await News.findAll({
      where: {
        softDeleted: false,
      },
    });

    return res.status(200).json({
        news: news,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

const getById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const news = await News.findOne({
      where: {
        id: id,
        softDeleted: false,
      },
    });

    res.status(200).json({
        news: news,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

const createNews = async (req = request, res = response) => {
  const { name, content, image } = req.body;
  sendEmail('ezegeek@gmail.com', 'Noticia creada',
  'Contenido: ' + content);
  const softDeleted = false;

  const createdNews = new News({
    name,
    content,
    image,
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

const putNews = async (req = request, res = response) => {
  const { id } = req.params;

  const { name, content, image } = req.body;

  const updatedNews = {
    name,
    content,
    image,
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
const deleteNews = async (req = request, res = response) => {
  const { id } = req.params;

  const updatedNews = {
    softDeleted: true,
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

//phisical DELETE
const phisicalDelete = async (req = request, res = response) => {
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
