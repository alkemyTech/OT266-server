const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {

    const token = req.header('Authorization');
    if (!token) return res.status(403).json({error: 'Unauthorized', message: 'Access denied'});

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if(payload.rol != 1){
            res.status(403).json({
                error:'Access denied',
                message:"You don't have permission to access"
            })
        }

        next();
    } catch (err) {
        res.status(401).json({error: 'Invalid Token', message: 'Access denied'});
    }
}

module.exports = {
    verifyAdmin
}
