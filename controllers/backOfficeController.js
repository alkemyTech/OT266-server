const { default: fetch } = require("node-fetch");

const getAll = async (req,res) => {
    const authorization = req.header('Authorization');

    try {
        const contacts = await fetch('http://localhost:3000/contacts/', {
            headers: {
                'Authorization': authorization
            }, 
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        return res.status(200).json(contacts);
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error: error,
        });
    }
}

module.exports = {
    getAll
};