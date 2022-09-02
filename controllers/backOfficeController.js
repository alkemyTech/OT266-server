const { default: fetch } = require("node-fetch");

const getAll = async (req,res) => {
    try {
        fetch('http://localhost:3000/contacts/')
        .then(response => response.json())
        .then(data => console.log(data));
        
        return res.status(200).json({
            message: 'Its working'
        });
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