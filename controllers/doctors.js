const doctorRouter = require('express').Router()
const { sequelize } = require('../util/db')
const { Doctor , Patient} = require('../models')
const { Op } = require('sequelize')
const Finder = async (req, res, next) => {
  const where = {}
  where.id = req.params.id
  req.doctor = await Doctor.findAll({
    attributes: { exclude: ['password'] },
    include:{
      model:Patient,
      attributes:{exclude:['password']}
    },
    where
  })
  next()
}

doctorRouter.get('/:id',  async (req, res) => {
  const id = req.params.id
  ans = {}
  var query = ""
  query = `select
            name,
            contant_info as contantInfo
          from doctors
          where id = ` + id
  const self= await sequelize.query(query ,{
    type: sequelize.QueryTypes.SELECT
  })
  ans.person = self[0]

  query = `SELECT
            count(*) as patientsNum
          FROM
            doctors as d,
            patients as p
          WHERE
            p.doctor_id = d.id
            and d.id = ` + id
  const num= await sequelize.query(query ,{
    type: sequelize.QueryTypes.SELECT
  })
  ans.patientNum = num[0].patientsnum;

  query = `SELECT
            p.id,
            p.name,
            p.birth_date,
            p.contant_info,
            p.balance
          FROM
            doctors as d,
            patients as p
          WHERE
            p.doctor_id = d.id
            and d.id = ` + id
  if(req.query.name){
    query += ` and p.name LIKE '%` + req.query.name +`%'`
  }
  const patient= await sequelize.query(query ,{
    type: sequelize.QueryTypes.SELECT
  })
  ans.patient = patient 

  const medication = await sequelize.query(`select * from medications`,{
    type: sequelize.QueryTypes.SELECT
  })
  ans.medication = medication
  
  res.json(ans)

})
doctorRouter.get('/', async (req, res) => {
  const where = {}

  if (req.query.name) {
    where.name= {
      [Op.substring]: req.query.name
    }
    console.log(req.query.name)
  } 
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

  const p = await Doctor.findAll({
    attributes: { exclude: ['password'] },
    include : {
      model : Patient,
      attributes: { exclude: ['password'] },
    },
    where 
  })

  p.forEach(element => {
    element.dataValues.patientNum = element.dataValues.patients.length
    console.log(element.dataValues)
    delete element.dataValues["patients"]
  });
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


doctorRouter.delete('/:id', Finder, async (req, res) => {
  if (req.doctor) {
    await req.doctor.destroy()
  }
  res.status(204).end()
})


module.exports = doctorRouter
