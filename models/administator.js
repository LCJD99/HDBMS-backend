const { Model, DataTypes} = require('sequelize')

const { sequelize } = require('../util/db')

class Administator extends Model {}

Administator.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  account: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'administator'
})

module.exports = Administator;

