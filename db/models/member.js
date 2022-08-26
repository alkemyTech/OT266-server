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
    static associate(models) {
      
    }
  };
  Member.init({
    nameMember: DataTypes.STRING,
    facebookUrl: DataTypes.STRING,
    instagramUrl: DataTypes.STRING,
    linkedinUrl: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    softDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};