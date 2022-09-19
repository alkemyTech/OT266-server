//Models
const { Comment } = require('../db/models/index');

//Utils
const {getIdViaToken} = require('../utils/jwtHelper');

//Handlers for routes
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

const commentsPost = async (req,res) => {
    //Create user/body/news id variable for insert query
    let userIdQuery;
    let commentBodyQuery;
    let newsIdQuery;

    //get id via token, will use it to send the comment to DB
    const token = req.header('Authorization');
    let userIdViaJWT = await getIdViaToken(token);
        //Asign the value via token to the variable for query
        userIdQuery = userIdViaJWT;

    //Get body data from req.body
    let commentData = req.body.commentdata;
        //Asign the value via body to the variable for query
        commentBodyQuery = commentData;

    //Get newsid from req.body
        let newsIdBody = Number(req.body.newsid);
            //Testing:
                //If theres not input value received: newsIdBody = NaN
                //If input value is empty: newsIdBody = 0
                //If theres a letter in the input value: newsIdBody = NaN
            //Asign the value via body to the variable for query after passing the condition
        if(newsIdBody != NaN && newsIdBody > 0){
            newsIdQuery = newsIdBody;
        }else{
            newsIdQuery = null;
        }

    //Create new comment
        //If condition check every possible error
    if(!isNaN(userIdQuery) && commentBodyQuery !== null && newsIdQuery !== null){
        try {
            let newComment = await Comment.create({
                user_id: userIdQuery,
                body: commentBodyQuery,
                news_id: newsIdQuery
            });
            res.status(200).json({"New Comment:":"OK",newComment})
        } catch (error) {
            res.send(error)
        }
    }else{
        res.send('Some fields are empty or not correct')
    }
}

const commentsDelete = async (req = request, res = response) => {
    
    const {id} = req.params;
    
    try {
        const comment = await comment.findByPk(id)
        
        if(!comment){
            return res.status(404).json({
                msg:`comment ${id} not found`
            })
        }

        await comment.destroy();

        return res.status(200).json({
            msg: 'comment Deleted'
        })

    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}


const commentsPut = async (req = request, res = response) => {

    const {id} = req.params;

    const {
        body
    } = req.body.body;

    const updatedComment = {
        body
    }

    try {
        const Comment = await Comment.findByPk(id)
        
        if(!Comment){
            return res.status(404).json({
                msg:`Comment ${id} not found `
            })
        }

        await Comment.update(updatedComment);

        return res.status(200).json({
            comment: Comment
        })

    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }

}



module.exports = {
    commentsGet,
    commentsPost,
    commentsDelete,
    commentsPut
}
