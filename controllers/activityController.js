'use strict';
const Activity = require('../models/activity');

class ActivityController {

    async post(req, res) {
        try {
            const activity = req.body;
            const createActivity = await Activity.create(activity)
            return res.json({ msg: "Activity created" });

        } catch (err) {
            res.json({
                message: err
            });
        }
    }

    async get(req, res) {
        try {
            const activity = await Activity.findAll();
            res.json(activity);
        } catch (err) {
            res.json({
                message: err
            });
        }
    }

    async put(req, res) {
        const id = req.params.id;
        try {
            activity = await Activity.findOne({
                where: {
                    id: id
                }
            });
        } catch (err) {
            res.json({
                message: err
            });
        }

        if (!activity) {
            return res.json({ message: "Activity not found" });
        }

        try {
            activity.update(req.body, {
                where: { id: id }
            });
            res.json({ success: 'Activity modified' });
        } catch (err) {
            res.json({
                message: err
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params;
            await Activity.destroy({
                where: { id }
            });
            res.json('Activity deleted successfully');
        } catch (err) {
            console.log(err);
        }
    }

}
module.exports = new ActivityController();