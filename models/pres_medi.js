const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class PresciptionMedication extends Model {}

PresciptionMedication.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  prescriptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { 
        model: 'presciptions', 
        key: 'id' 
    },
  },
  medicationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { 
        model: 'medications', 
        key: 'id' 
    },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'pres_medi'
})

module.exports = PresciptionMedication;