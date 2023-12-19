const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')
class Record extends Model {}

Record.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'patients', key:'id'}
  },
  date: {
    type: DataTypes.DATE
  },
  symptom: {
    type: DataTypes.TEXT,
    allowNull: false
  },

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'record'
})

module.exports = Record;
