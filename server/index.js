const express = require('express')
const taskRouter = require('./routes/task')
const cors = require('cors')

const PORT = 3000

const app = express()
app.use(cors())

app.use(express.json())
app.use('/', taskRouter)

app.listen(PORT, () => {
    console.log('Server has been started')
})