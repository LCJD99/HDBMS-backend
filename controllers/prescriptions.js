const prescriptionRouter = require('express').Router()
const {Op} = require('sequelize')
const { Prescription , Record, Medication} = require('../models')

const Finder = async (req, res, next) => {
  const where = {}
  where.id = req.params.id
  req.prescription = await Prescription.findAll({
    include:{
      model:Patient
    },
    where
  })
  next()
}

prescriptionRouter.get('/', async (req, res) => {
  const where = {}

  if (req.query.name) {
    where.name= {
      [Op.substring]: req.query.name
    }
    console.log(req.query.name)
  } 

  const p = await Prescription.findAll({
    include : {
      model : Patient
    },
    where 
  })

  res.json(p)
})

prescriptionRouter.post('/',  async (req, res) => {
  try {
    console.log(req.body)
    const prescription = await Prescription.create(req.body)
    res.json(prescription)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

prescriptionRouter.get('/:id', Finder, async (req, res) => {
  if (req.prescription) {
    res.json(req.prescription)
  } else {
    res.status(404).end()
  }
})

prescriptionRouter.delete('/:id', Finder, async (req, res) => {
  if (req.prescription) {
    await req.prescription.destroy()
  }
  res.status(204).end()
})


module.exports = prescriptionRouter

