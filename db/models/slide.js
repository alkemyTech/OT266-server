'use strict';
const {
  Model
} = require('sequelize');
const slides = require('../../../OT225-server/models/slides');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Slide.belongsTo(models.Organization)
    }
  };
  Slide.init({
    imageUrl: DataTypes.STRING,
    text: DataTypes.TEXT,
    order: DataTypes.INTEGER,
    organizationId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Slides',
  });
  return Slide;
};