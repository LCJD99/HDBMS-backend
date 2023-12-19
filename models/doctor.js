
const { Model, DataTypes, DATEONLY } = require('sequelize')

const { sequelize } = require('../util/db')

class Doctor extends Model {}

Doctor.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contantInfo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'doctor'
})

module.exports = Doctor;
