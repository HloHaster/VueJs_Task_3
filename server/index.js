const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = 3000

const tasksRoutes = require('./routes/tasks')

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(tasksRoutes)

const url = 'mongodb+srv://HloHaster:12341234@tasks.fz0k4.mongodb.net/tasks';
mongoose.connect(url, (error) => {
    if (error) {
        console.log(error)
        return
    }

    console.log('It is connected')
    app.listen(PORT, () => {
        console.log('Server has been started')
    })
})