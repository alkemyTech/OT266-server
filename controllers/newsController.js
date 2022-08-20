'use strict';
const News = require('../models/news');

class NewsController {

    async post(req, res) {
        try {
            const news = req.body;
            const createNews = await News.create(news)
            return res.json({ msg: "News created" });

        } catch (err) {
            res.json({
                message: err
            });
        }
    }

    async get(req, res) {
        try {
            const news = await News.findAll();
            res.json(news);
        } catch (err) {
            res.json({
                message: err
            });
        }
    }

    async put(req, res) {
        const id = req.params.id;
        try {
            news = await News.findOne({
                where: {
                    id: id
                }
            });
        } catch (err) {
            res.json({
                message: err
            });
        }

        if (!news) {
            return res.json({ message: "News not found" });
        }

        try {
            news.update(req.body, {
                where: { id: id }
            });
            res.json({ success: 'News modified' });
        } catch (err) {
            res.json({
                message: err
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params;
            await News.destroy({
                where: { id }
            });
            res.json('News deleted successfully');
        } catch (err) {
            console.log(err);
        }
    }

}
module.exports = new NewsController();