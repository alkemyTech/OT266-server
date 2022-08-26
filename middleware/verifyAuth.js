const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyAuth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(403).json({error: 'Unauthorized', message: 'Access denied'});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({error: 'Invalid Token', message: 'Access denied'});
    }
}

module.exports = {
    verifyAuth
}
