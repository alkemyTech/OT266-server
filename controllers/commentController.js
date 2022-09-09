const { Comment } = require("../db/models");


const commentsGet = async (req, res) => {
    try {
        //Get "body" from all comments.
        const comments = await Comment.findAll({
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

