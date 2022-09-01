'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Contacts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Contacts.init({
        name: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        email: DataTypes.STRING,
        //message allows 255 characters
        message: DataTypes.STRING,
        deletedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Contacts',
        paranoid: true,
    });
    return Contacts;
};