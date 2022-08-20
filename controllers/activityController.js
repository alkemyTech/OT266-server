const { Activity } = require('../db/models');


const activityPost = async(req, res) => {
    try {
        const body = {
            name: req.body.name,
            content: req.body.content,
            image: req.body.image,
            softDelete: false
        };
        const createActivity = await Activity.create(body);
        return res.status(200).json({ msg: "Actividad Creada" });

    } catch (err) {
        res.status(400).json({
            message: err
        });
    }
}

const activityGet = async(req, res) => {
    try {
        const activity = await Activity.findAll({
            where: {
                softDelete: false
            },
            attributes: ['name', 'content', 'image'],
        });
        res.status(200).json(activity);
    } catch (err) {
        res.status(400).json({
            message: err
        });
    }
}

const activityUpdate = async(req, res) => {
    const id = req.params.id;
    try {
        activity = await Activity.findByPk(id);
        if (!activity) {
            return res.json({ message: "Actividad no encontrada." });
        }
    } catch (err) {
        res.json({
            message: err
        });
    }

    try {
        activity.update(req.body, {
            where: { id: id }
        });
        res.json({ success: 'Actividad modificada.' });
    } catch (err) {
        res.status(400).json({
            message: err
        });
    }
}

const activityDelete = async(req, res) => {
    const id = req.params.id;
    const updateActivity = {
        softDelete: true
    }
    try {
        activity = await Activity.findByPk(id);

        if (!activity) {
            return res.status(404).json({ message: "Actividad no encontrada." });
        }

    } catch (err) {
        return res.status(400).json({
            message: err
        });
    }

    try {
        activity.update(updateActivity, {
            where: { id: id }
        });
        return res.json({ success: 'Actividad eliminada.' });

    } catch (err) {

        return res.status(400).json({
            message: err
        });
    }
}

module.exports = {
    activityPost,
    activityGet,
    activityUpdate,
    activityDelete

}