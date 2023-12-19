const { Model, DataTypes, DATEONLY } = require('sequelize')

const { sequelize } = require('../util/db')

class Prescription extends Model {}

Prescription.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    recordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'records',
        key: 'id'
      }
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    prescriptionDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'prescription'
  })

module.exports = Prescription;
