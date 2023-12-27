const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Testlab extends Model {}

Testlab.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    testType: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    result: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    testDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'testlab'
  })

module.exports =Testlab;

