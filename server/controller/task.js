const TaskValidator = require('../validator/taskValidator')
const TaskRepository = require('../repository/taskRepository')

class TaskController {
    async createTask(req, res) {
        const {title, deadline, description, status} = req.body
        const task = {
            title,
            deadline,
            description,
            status
        }
        if (TaskValidator.isValid(task)) {
            try {
                let id = await TaskRepository.create(task)
                task.id = id
                res.json(task)
            } catch(e) {
                res.status(500)
                res.json({errorMessage: "Unexpected error occurred on the server"})
            }
        } else {
            res.status(400)
            res.json({errorMessage: "Task's fields must not be empty"})
        }
    }

    async getTasks(req, res) {
        try {
            const tasks = await TaskRepository.getAll()
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