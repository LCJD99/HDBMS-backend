const testlabRouter = require('express').Router()
const {Op} = require('sequelize')

const { Testlab ,Doctor} = require('../models')

const Finder = async (req, res, next) => {
  req.testlab= await Testlab.findByPk(req.params.id,{
    attributes: { exclude: ['password'] }
  })
  next()
}

testlabRouter.get('/', async (req, res) => {
  const where = {}

  if (req.query.test_type) {
    where.test_type= {
      [Op.substring]: req.query.test_type
    }
  } 

  if (req.query.doctorId) {
    where.doctorId= {
      [Op.eq]: req.query.doctorId
    }
  }

  const p = await Testlab.findAll({ 
    includes:{
      model : Doctor
    },
    where 
  } )

  res.json(p)
})

testlabRouter.post('/',  async (req, res) => {
  try {
    console.log(req.body)
    const testlab = await Testlab.create(req.body)
    res.json(testlab)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

testlabRouter.get('/:id', Finder, async (req, res) => {
  if (req.testlab) {
    res.json(req.testlab)
  } else {
    res.status(404).end()
  }
})

testlabRouter.delete('/:id', Finder, async (req, res) => {
  if (req.testlab) {
    await req.testlab.destroy()
  }
  res.status(204).end()
})

// TODO: can judge which information to be change
testlabRouter.put('/:id', Finder, async (req, res) => {
  if (req.testlab) {
    req.testlab.balance= req.body.balance
    await req.testlab.save()
    res.json(req.testlab)
  } else {
    res.status(404).end()
  }
})

module.exports = testlabRouter
