'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Activity extends Model {

        // static associate(models) {
        //   User.belongsTo(models.Role, {as: 'role'});
        // }
    };
    Activity.init({
        name: DataTypes.STRING,
        content: DataTypes.STRING,
        image: DataTypes.STRING,
        //roleId: DataTypes.INTEGER,
        deletedAt: DataTypes.DATE,
        softDeletes: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Activiy',
    });
    return Activity;
};