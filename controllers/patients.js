const patientRouter = require('express').Router()
const { Op } = require('sequelize')
const { Patient, Doctor, Medication, Prescription, Record, Testlab, PresciptionMedication, } = require('../models')
const { sequelize} = require('../models/doctor')

const Finder = async (req, res, next) => {
  req.patient = await Patient.findByPk(req.params.id, { })
  next()
}


patientRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  ans = {}
  var query = `SELECT
                  name,
                  gender,
                  birth_date,
                  contant_info ,
                  balance
                FROM
                  patients 
                WHERE
                  patients.ID = ` + id 
  const self= await sequelize.query(query ,{
    type: sequelize.QueryTypes.SELECT
  })
  ans.patient = self[0]
  
  query = `SELECT doctors.NAME,
  doctors.contant_info 
  FROM
  doctors,
  patients 
  WHERE
  doctors.ID = patients.doctor_id 
  AND patients.ID = ` + id 
  const doctor = await sequelize.query(query ,{
    type: sequelize.QueryTypes.SELECT
  })
  ans.doctor = doctor[0]
  query = `SELECT
              m.id as id,
              pre.prescription_date as date,
              pre.instructions,
              m.name,
              m.dosage,
              m.manufacturer
            FROM
              patients as p,
              records as r,
              prescriptions as pre, 
              pres_medis as pm,
              medications as m
            WHERE
              r.patient_id = p.id
              and pre.record_id = r.id
              and pm.prescription_id = pre.id
              and pm.medication_id = m.id
              and p.id = ` + id

  const medi = await sequelize.query(query ,{
    type: sequelize.QueryTypes.SELECT
  })
  ans.medication = medi 
  query = `SELECT
            t.id ,
            t.test_date as date,
            t.test_type,
            t.result
          FROM
            testlabs as t,
            records as r,
            patients as p
          WHERE
            p.id = r.patient_id
            and r.id = t.record_id
            and p.id = 2`
  const test = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT
  })
  ans.testlab = test
  res.json(ans)

})

patientRouter.get('/', async (req, res) => {
  const where = {}

  if (req.query.name) {
    where.name = {
      [Op.substring]: req.query.name
    }
  }

  if (req.query.balance) {
    where.balance = {
      [Op.lte]: req.query.balance
    }
  }

  if (req.query.doctorId) {
    where.doctorId = {
      [Op.eq]: req.query.doctorId
    }
  }

  if (req.query.account) {
    where.account = {
      [Op.eq]: req.query.account
    }
  }

  if (req.query.password) {
    where.password = {
      [Op.eq]: req.query.password
    }
  }

  const p = await Patient.findAll({
    attributes: { exclude: ['password'] },
    includes: {
      model: Doctor
    },
    where
  })

  res.json(p)
})

patientRouter.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const patient = await Patient.create(req.body)
    res.json(patient)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

// patientRouter.get('/:id', Finder, async (req, res) => {
//   if (req.patient) {
//     res.json(req.patient)
//   } else {
//     res.status(404).end()
//   }
// })

patientRouter.delete('/:id', Finder, async (req, res) => {
  if (req.patient) {
    await req.patient.destroy()
  }
  res.status(204).end()
})

// TODO: can judge which information to be change
patientRouter.put('/:id', Finder, async (req, res) => {
  if (req.patient) {
    req.patient.name = req.body.name
    req.patient.contantInfo = req.body.contantInfo 
    req.patient.balance = req.body.balance
    req.patient.account = req.body.account
    req.patient.birthDate= req.body.birthDate.toString()
    req.patient.doctorId= req.body.doctorId
    await req.patient.save()
    res.json(req.patient)
  } else {
    res.status(404).end()
  }
})

module.exports = patientRouter
