'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Organization.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
  },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    welcomeText: DataTypes.TEXT,
    aboutUsText: DataTypes.TEXT,
    urlFacebook: DataTypes.TEXT,
    urlLinkedin: DataTypes.TEXT,
    urlInstagram: DataTypes.TEXT

  }, {
    sequelize,
    modelName: 'Organization',
    paranoid: true

  });
  return Organization;
};