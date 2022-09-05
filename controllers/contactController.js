const { Contact } = require('../db/models');
const {sendEmail} = require('../utils/emailSender');

// Function to fetch all contacts
const getAllContacts = async(req = request, res = response) => {
    try {
        const contacts = await Contact.findAll({});

        return res.status(200).json({
            contacts: contacts,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error: error,
        });
    }
};

// Enter contact
const contactPost = async(req, res) => {
    try {
        const body = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            message: req.body.message
        };
        const createContact = await Contact.create(body);
        sendEmail(req.body.email, `Hola ${req.body.name}`, 
        `Tu contacto ha sido recibido correctamente.\nAgradecemos tu apoyo para que podamos seguir ayudando a los más necesitados.`);
        return res.status(200).json({
            'name': createContact.name,
            'phone': createContact.phone,
            'email': createContact.email,
            'message': createContact.message,
        });

    } catch (err) {
        return res.status(400).json({
            message: err
        });
    }
}

module.exports = {
    contactPost,
    getAllContacts
}