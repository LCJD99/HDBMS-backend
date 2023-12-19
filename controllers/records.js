const recordRouter = require('express').Router()
const {Op} = require('sequelize')

const { Record } = require('../models')

const Finder = async (req, res, next) => {
  req.record= await Record.findByPk(req.params.id)
  next()
}

recordRouter.get('/', async (req, res) => {
  const where = {}

  if (req.query.PatientId) {
    where.PatientId= {
      [Op.substring]: req.query.name
    }
    
  } 

  if (req.query.balance) {
    where.balance= {
      [Op.lte]: req.query.balance
    }
  }

  const p = await Record.findAll({ where } )

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
    req.record.balance= req.body.balance
    await req.record.save()
    res.json(req.record)
  } else {
    res.status(404).end()
  }
})

module.exports = recordRouter

