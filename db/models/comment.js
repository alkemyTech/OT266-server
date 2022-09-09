'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User);
      Comment.belongsTo(models.News)
    }
  }
  Comment.init({
    user_id: DataTypes.INTEGER,
    body: DataTypes.STRING,
    news_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
    paranoid: true
  });
  return Comment;
};