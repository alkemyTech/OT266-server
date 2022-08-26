const { verifyToken } = require('../utils/jwtHelper');

const verifyAdmin = async (req, res, next) => {

    const token = req.header('Authorization');
    if (!token) {
        return res.status(403).json({
            error: 'Unauthorized', 
            message: 'Access denied'
        });
    }else{
        try {
            const payload = await verifyToken(token, process.env.JWT_SECRET);
    
            if(payload.rol != 1){
                return res.status(403).json({
                    error:'Access denied',
                    message:"You don't have permission to access"
                })
            }
    
            next();
        } catch (err) {
            return res.status(401).json({
                error: 'Invalid Token', 
                message: 'Access denied'
            });
        }
    }

    
}

module.exports = {
    verifyAdmin
}
