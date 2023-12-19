const patientRouter = require('express').Router()
const {Op} = require('sequelize')

const { Patient } = require('../models')
const Doctor = require('../models/doctor')

const Finder = async (req, res, next) => {
  req.patient= await Patient.findByPk(req.params.id)
  next()
}

patientRouter.get('/', async (req, res) => {
  const where = {}

  if (req.query.name) {
    where.name= {
      [Op.substring]: req.query.name
    }
  } 

  if (req.query.balance) {
    where.balance= {
      [Op.lte]: req.query.balance
    }
  }

  if (req.query.doctorId) {
    where.doctorId= {
      [Op.eq]: req.query.doctorId
    }
  }

  const p = await Patient.findAll({ 
    includes:{
      model : Doctor
    },
    where 
  } )

  res.json(p)
})

patientRouter.post('/',  async (req, res) => {
  try {
    console.log(req.body)
    const patient = await Patient.create(req.body)
    res.json(patient)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

patientRouter.get('/:id', Finder, async (req, res) => {
  if (req.patient) {
    res.json(req.patient)
  } else {
    res.status(404).end()
  }
})

patientRouter.delete('/:id', Finder, async (req, res) => {
  if (req.patient) {
    await req.patient.destroy()
  }
  res.status(204).end()
})

// TODO: can judge which information to be change
patientRouter.put('/:id', Finder, async (req, res) => {
  if (req.patient) {
    req.patient.balance= req.body.balance
    await req.patient.save()
    res.json(req.patient)
  } else {
    res.status(404).end()
  }
})

module.exports = patientRouter
