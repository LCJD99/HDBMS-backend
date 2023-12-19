const { Model, DataTypes, DATEONLY } = require('sequelize')

const { sequelize } = require('../util/db')

class Patient extends Model {}

Patient.init({
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
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  balance: {
    type: DataTypes.DOUBLE,
    defaultValue: 0
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'doctors',
      key: 'id'
    }
  },

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'patient'
})

module.exports = Patient;
