const { request, response } = require("express");
const { Comments } = require("../db/models");


const commentsGet = async (req = request, res = response) => {
    try {
        const comments = await Comments.findAll({
            attributes: ["body"],
            order: [["createdAt", "DESC"]],
        });
        return res.status(200).json({
            comments: comments,
        });
    } catch (error) {
        return res.status(400).json({
            error: error,
        });
    }
};

module.exports = {
    commentsGet,
};

