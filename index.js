const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const cors = require('cors');
const patientRouter = require('./controllers/patients')
const doctorRouter = require('./controllers/doctors')
const recordRouter = require('./controllers/records')
const medicationRouter= require('./controllers/medications')
const prescriptionRouter = require('./controllers/prescriptions');
const testlabRouter = require('./controllers/testlabs')
const administatorRouter =  require('./controllers/administators')


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
app.use('/api/testlabs', testlabRouter)
app.use('/api/presciptions', prescriptionRouter)
app.use('/api/admins', administatorRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()