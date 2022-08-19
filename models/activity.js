'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Activity extends Model {

        static associate(models) {}
    };
    Activity.init({
        name: DataTypes.STRING,
        content: DataTypes.STRING,
        image: DataTypes.STRING,
        deletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Activiy',
        paranoid: true
    });
    return Activity;
};