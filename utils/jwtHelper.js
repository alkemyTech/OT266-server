const jwt = require ('jsonwebtoken');
const { token } = require('morgan');

const secretToken = process.env.JWT_SECRET;

/**
* Se pasa objeto con info id,name,role. Ejemplo: {id: 4,name: "guido",rol:2}
* @param {*} userData
*/
const signToken7d = async (userData) => {

    let token = await jwt.sign ({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            rol: userData.rol
        }, 
            secretToken,
        {
            expiresIn: '7d'
        }
    );

    return token
}

/**
* Pasar el token de session el JWT
* @param {*} tokenJwt
* @returns
*/
const verifyToken = async (tokenJwt) => {
    try{
        return jwt.verify(tokenJwt, secretToken)
    }catch(e){
        return null
    }
};

const getIdViaToken = async (token) => {
    try{
        let data = await jwt.verify(token, secretToken);
        return data.id
    }catch(e){
        return null
    }
}

module.exports = { signToken7d, verifyToken, getIdViaToken };