const doctorRouter = require('express').Router()
const {Op} = require('sequelize')
const Patient = require('../models/patient')

const { Doctor } = require('../models')

const Finder = async (req, res, next) => {
  const where = {}
  where.id = req.params.id
  req.doctor = await Doctor.findAll({
    include:{
      model:Patient
    },
    where
  })
  next()
}

doctorRouter.get('/', async (req, res) => {
  const where = {}

  if (req.query.name) {
    where.name= {
      [Op.substring]: req.query.name
    }
    console.log(req.query.name)
  } 

  const p = await Doctor.findAll({
    include : {
      model : Patient
    },
    where 
  })

  res.json(p)
})

doctorRouter.post('/',  async (req, res) => {
  try {
    console.log(req.body)
    const doctor = await Doctor.create(req.body)
    res.json(doctor)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

doctorRouter.get('/:id', Finder, async (req, res) => {
  if (req.doctor) {
    res.json(req.doctor)
  } else {
    res.status(404).end()
  }
})

doctorRouter.delete('/:id', Finder, async (req, res) => {
  if (req.doctor) {
    await req.doctor.destroy()
  }
  res.status(204).end()
})


module.exports = doctorRouter
