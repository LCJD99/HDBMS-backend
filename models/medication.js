const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')
class Medication extends Model {}

Medication.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dosage: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'medication'
  })

module.exports = Medication;

