const { Contact } = require('../db/models');


// List contacts
const contactGet = async(req, res) => {
    try {
        const contact = await Contact.findAll({
            attributes: ['name', 'phone', 'email', 'message'],
        });
        res.status(200).json(contact);
    } catch (err) {
        return res.status(400).json({
            message: err
        });
    }
}



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

//Delete contact
const contactDelete = async(req, res) => {
    const id = req.params.id;
    try {
        contact = await Contact.findByPk(id);

        if (!contact) {
            return res.status(404).json({
                message: "Contact not exist."
            });
        }

    } catch (err) {
        return res.status(400).json({
            message: err
        });
    }

    try {
        let softDeleteContact = await Contact.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).send({
            message: "Contact deleted."
        })
    } catch (err) {
        return res.status(404).json({
            message: err
        });
    }
}




module.exports = {
    contactGet,
    contactPost,
    contactDelete,
}