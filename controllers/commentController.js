//Importo modelos
const { Comment } = require('../db/models/index');

//Handlers for routes
const commentsPost = (req,res) => {
    res.send('post de /comments')
}


module.exports = {commentsPost}