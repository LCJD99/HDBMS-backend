const medicationRouter = require('express').Router()
const {Op} = require('sequelize')

const { Medication } = require('../models')

const Finder = async (req, res, next) => {
  req.medication= await Medication.findByPk(req.params.id)
  next()
}

medicationRouter.get('/', async (req, res) => {
  const where = {}

  if (req.query.name) {
    where.name= {
      [Op.substring]: req.query.name
    }
  } 

  const p = await Medication.findAll({ } )

  res.json(p)
})

medicationRouter.post('/',  async (req, res) => {
  try {
    console.log(req.body)
    const medication = await Medication.create(req.body)
    res.json(medication)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

medicationRouter.get('/:id', Finder, async (req, res) => {
  if (req.medication) {
    res.json(req.medication)
  } else {
    res.status(404).end()
  }
})

medicationRouter.delete('/:id', Finder, async (req, res) => {
  if (req.medication) {
    await req.medication.destroy()
  }
  res.status(204).end()
})

// TODO: can judge which information to be change
medicationRouter.put('/:id', Finder, async (req, res) => {
  if (req.medication) {
    req.medication.balance= req.body.balance
    await req.medication.save()
    res.json(req.medication)
  } else {
    res.status(404).end()
  }
})

module.exports = medicationRouter

