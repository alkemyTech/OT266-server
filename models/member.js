'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /**static associate(models) {
      Member.belongsTo(models.Role, {as: 'role'});
    }**/
  };
  Member.init({
    name: DataTypes.STRING,
    facebookUrl: DataTypes.STRING,
    instagramUrl: DataTypes.STRING,
    linkedinUrl: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};