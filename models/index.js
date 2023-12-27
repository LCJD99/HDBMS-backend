const Doctor = require('./doctor')
const Medication = require('./medication')
const Patient = require('./patient')
const Prescription = require('./prescription')
const Record = require('./record')
const Administator= require('./administator')
const Testlab = require('./testlab')
const PresciptionMedication = require('./pres_medi')

Doctor.hasMany(Patient)
Patient.belongsTo(Doctor)

Patient.hasOne(Record)

Testlab.belongsTo(Record)
Record.hasMany(Testlab)

Record.hasMany(Prescription)
Prescription.belongsTo(Record)

Prescription.belongsToMany(Medication, {through: PresciptionMedication})
Medication.belongsToMany(Prescription, {through: PresciptionMedication})

const CreateTable = async () =>{
   await Doctor.sync({alter: true})
   await Administator.sync({alter: true})
   await Patient.sync({alter: true})
   await Medication.sync({alter: true})
   await Testlab.sync({alter: true})
   await Record.sync({alter: true})
   await Prescription.sync({alter: true})
   await PresciptionMedication.sync({alter: true})
}

// CreateTable()
// Record.sync({alter: true})
// Medication.sync({alter: true})

module.exports = {
   Doctor, Medication, Patient, Prescription, Record, Testlab, PresciptionMedication,
   Administator
}