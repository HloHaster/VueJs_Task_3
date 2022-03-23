const db = require('../db')
const TaskValidator = require('../validator/taskValidator')

class TaskController {
    async createTask(req, res) {
        const {title, deadline, description, status} = req.body
        const task = {
            title,
            deadline,
            description,
            status
        }
        TaskValidator.isTaskFieldEmpty(task)
         try {
             const id = await db.query('INSERT INTO task (title, deadline, description, status) values ($1, $2, $3, $4) RETURNING id', [title, deadline, description, status])
             task.id = id
             res.json(task)
         } catch {
             res.status(500)
             res.json({errorMessage: "Unexpected error occurred on the server"})
         }
    }
    async getTasks(req, res) {
        try {
            const tasks = await db.query('SELECT * FROM task')
            res.json(tasks.rows)
        } catch {
            res.status(500)
            res.json({errorMessage: "Unexpected error occurred on the server"})
        }
    }
    async getOneTask(req, res) {
        const id = req.params.id
        try {
            const task = await db.query('SELECT * FROM task WHERE id = $1', [id])
            res.json(task.rows)
        } catch {
            res.status(500)
            res.json({errorMessage: "Unexpected error occurred on the server"})
        }
    }
    async updateTask(req, res) {

    }
    async deleteTask(req, res) {
        const id = req.params.id
        try {
            const task = await db.query('DELETE FROM task WHERE id = $1', [id])
            res.json(task.rows)
        } catch {
            res.status(500)
            res.json({errorMessage: "Unexpected error occurred on the server"})
        }
    }
}

module.exports = new TaskController()