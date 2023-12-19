const Doctor = require('./doctor')
const Medication = require('./medication')
const Patient = require('./patient')
const Prescription = require('./prescription')
const Record = require('./record')
const Testlab = require('./testlab')
const PresciptionMedication = require('./pres_medi')
const Sequelize = require('sequelize')
Doctor.hasMany(Patient)
Patient.belongsTo(Doctor)

Prescription.belongsTo(Record)
Record.hasMany(Prescription)

Prescription.belongsToMany(Medication, {through: PresciptionMedication})
Medication.belongsToMany(Prescription, {through: PresciptionMedication})

Record.hasMany(Testlab)
Testlab.belongsTo(Record)

// Doctor.sync({alter: true})
// Patient.sync({alter: true})
// Record.sync({alter: true})
// Medication.sync({alter: true})
// Prescription.sync({alter: true})
// Testlab.sync({alter: true})
// PresciptionMedication.sync({alter: true})

module.exports = {
   Doctor, Medication, Patient, Prescription, Record, Testlab, PresciptionMedication
}