
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
  account: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "ddd"
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'doctor'
})

module.exports = Doctor;
