const {verifyToken} = require('../utils/jwtHelper');

const verifyUser = async (req, res, next) => {

    const {id} = req.params;

    const token = req.header('Authorization');
    if (!token) {
        return res.status(403).json({
            error: 'Unauthorized', 
            message: 'Access denied'
        })
        
    }else{
        try {
            const payload = await verifyToken(token);

            // if(payload.id != id){
            //     return res.status(403).json({
            //         error:'Access denied',
            //         message:"You don't have permission to access"
            //     })
            // }  

            // Agregue lo de verificar rol y se reemplaza lo que esta comentado anteriormente
            if(payload.rol != 2){
                return res.status(403).json({
                    error:'Access denied',
                    message:"You don't have permission to access"
                })
            }

            req.payload = payload; // Almacena el payload retornado para que pase a la sig. funcion.
    
            next();
        } 
        
        catch (err) {
            return res.status(401).json({
                error: 'Invalid Token', 
                message: 'Access denied'
            });
        }
    }
        
}

module.exports = {
    verifyUser
}