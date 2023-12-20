const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const cors = require('cors');
const patientRouter = require('./controllers/patients')
const doctorRouter = require('./controllers/doctors')
const recordRouter = require('./controllers/records')
const medicationRouter= require('./controllers/medications')


app.use(express.json())
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}))

app.use('/api/patients', patientRouter)
app.use('/api/doctors', doctorRouter)
app.use('/api/records', recordRouter)
app.use('/api/medications', medicationRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()