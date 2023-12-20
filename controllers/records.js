const recordRouter = require('express').Router()
const {Op} = require('sequelize')

const { Record ,Patient} = require('../models')

const Finder = async (req, res, next) => {
  const where = {}
  where.id = req.params.id
  req.record= await Record.findAll({
    include:{
      model:Patient
    },
    where
  })
  next()
}

recordRouter.get('/', async (req, res) => {
  const where = {}

  if (req.query.patient) {
    where.PatientId= {
      [Op.substring]: req.query.name
    }
    
  } 

  const p = await Record.findAll({ 
    include:{
      model: Patient
    },
    where 
  } )

  res.json(p)
})

recordRouter.post('/',  async (req, res) => {
  try {
    console.log(req.body)
    const record = await Record.create(req.body)
    res.json(record)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

recordRouter.get('/:id', Finder, async (req, res) => {
  if (req.record) {
    res.json(req.record)
  } else {
    res.status(404).end()
  }
})

recordRouter.delete('/:id', Finder, async (req, res) => {
  if (req.record) {
    await req.record.destroy()
  }
  res.status(204).end()
})

// TODO: can judge which information to be change
recordRouter.put('/:id', Finder, async (req, res) => {
  if (req.record) {
    req.record.symptom = req.body.symptom
    await req.record.save()
    res.json(req.record)
  } else {
    res.status(404).end()
  }
})

module.exports = recordRouter

