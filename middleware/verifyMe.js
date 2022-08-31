const { verifyToken } = require('../utils/jwtHelper');

// Verifies if it is a user and has it's authorization
const verifyMe = async (req, res, next) => {
    // Reads the token
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(403).json({
            error: 'Unauthorized', 
            message: 'Access denied'
        });
    }else{
        try {
            // Gets the user info
            const payload = await verifyToken(token, process.env.JWT_SECRET);
    
            // If rol != 2. It's not user, and shouldn't be allowed to access.
            if(payload.rol != 2){
                return res.status(403).json({
                    error:'Access denied',
                    message:"You don't have permission to access"
                })
            }
            
            // Stores userID to pass it to authMyInfoGET()
            res.locals.userId = payload.id;

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
    verifyMe
}