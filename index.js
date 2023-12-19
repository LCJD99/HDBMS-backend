const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const patientRouter = require('./controllers/patients')
const doctorRouter = require('./controllers/doctors')


app.use(express.json())

app.use('/api/patients', patientRouter)
app.use('/api/doctors', doctorRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()