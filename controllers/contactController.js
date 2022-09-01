const { Contact } = require('../db/models');

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
}