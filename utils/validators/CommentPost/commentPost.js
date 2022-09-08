const {check} = require('express-validator');
const { validateResult } = require('./validateCommentPostResult')

const commentPost = [
    check('commentdata','Please enter the comment text')
        .exists()
        .notEmpty().withMessage('Please write a comment')
        .isAlpha().withMessage('Please just enter letters in your comment')
        .isLength({min:10,max:240}).withMessage('Minimun: 10 letters / Max: 240 letters'),

    (req, res, next) => {
        validateResult(req,res,next)
    }
]

module.exports = {commentPost}