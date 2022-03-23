const express = require('express')
const bodyParser = require('body-parser')
const taskRouter = require('./routes/task')
const cors = require('cors')

const PORT = 3000

const app = express()
app.use(cors())

app.use(express.json())
app.use('/api', taskRouter)

const url = '';
app.listen(PORT, () => {
    console.log('Server has been started')
})


// const url = 'mongodb+srv://HloHaster:12341234@tasks.fz0k4.mongodb.net/tasks';
// mongoose.connect(url, (error) => {
//     if (error) {
//         console.log(error)
//         return
//     }
//
//     console.log('It is connected')
//     app.listen(PORT, () => {
//         console.log('Server has been started')
//     })
// })