const administatorRouter = require('express').Router()
const {Op} = require('sequelize')
const { Administator , Doctor, Patient, Medication} = require('../models/index')
const { sequelize } = require('../util/db')

const Finder = async (req, res, next) => {
    const where = {}
    where.id = req.params.id
    req.administator = await Administator.findAll({
      attributes: { exclude: ['password'] },
      where
    })
    next()
  }
administatorRouter.get('/', async (req, res) => {
  const where = {}

  if( req.query.account){
    where.account = {
      [Op.eq]: req.query.account
    }
  }

  if( req.query.password){
    where.password= {
      [Op.eq]: req.query.password
    }
  }

  const p = await Administator.findAll({
    attributes: { exclude: ['password'] },
    where 
  })

  res.json(p)
})

administatorRouter.post('/',  async (req, res) => {
  try {
    console.log(req.body)
    const administator = await Administator.create(req.body)
    res.json(administator)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

administatorRouter.get('/:id', Finder, async (req, res) => {
  ans = {}
  const doctor = await Doctor.findAll({
    attributes: { exclude: ['password'] },
  })
  const patient = await Patient.findAll({
    attributes: { exclude: ['password'] },
  })
  const medication= await Medication.findAll()
  ans.doctor = doctor;
  ans.patient = patient;
  ans.medication = medication;
  res.json(ans)
})

administatorRouter.delete('/:id', Finder, async (req, res) => {
  if (req.administator) {
    await req.administator.destroy()
  }
  res.status(204).end()
})


module.exports = administatorRouter

