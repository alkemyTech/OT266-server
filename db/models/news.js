'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     News.belongsTo(models.Categories, { foreignKey: 'categoryId', as: 'categories' });
    }
  }
  News.init({
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    softDeleted: DataTypes.BOOLEAN
    // Debo agregar un deleted at?
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};