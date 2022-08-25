const { Activity } = require('../db/models');


const activityPost = async(req, res) => {
    try {
        const body = {
            name: req.body.name,
            content: req.body.content,
            image: req.body.image
        };
        const createActivity = await Activity.create(body);
        return res.status(200).json({
            message: createActivity
        });

    } catch (err) {
        return res.status(400).json({
            message: err
        });
    }
}

const activityGet = async(req, res) => {
    try {
        const activity = await Activity.findAll({
            attributes: ['name', 'content', 'image'],
        });
        res.status(200).json(activity);
    } catch (err) {
        return res.status(400).json({
            message: err
        });
    }
}

const activityUpdate = async(req, res) => {
    const id = req.params.id;
    try {
        activity = await Activity.findByPk(id);
        if (!activity) {
            return res.json({
                message: "Activity not exist."
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: err
        });
    }

    try {
        activityUp = activity.update(req.body, {
            where: { id: id },
        });
        return res.status(200).json({ activity });
    } catch (err) {
        return res.status(400).json({
            message: err
        });
    }
}

const activityDelete = async(req, res) => {
    const id = req.params.id;
    try {
        activity = await Activity.findByPk(id);

        if (!activity) {
            return res.status(404).json({
                message: "Activity not found."
            });
        }

    } catch (err) {
        return res.status(400).json({
            message: err
        });
    }

    try {
        let softDeleteActivity = await Activity.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).send({
            message: "Activity deleted."
        })
    } catch (err) {
        return res.status(404).json({
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