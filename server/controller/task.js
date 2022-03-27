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
            } catch (e) {
                res.status(500)
                res.json({errorMessage: "Unexpected error occurred on the server"})
            }
        } else {
            res.status(400)
            res.json({errorMessage: "Task's fields must not be empty"})
        }
    }

    async getTasks(req, res) {
        // const { page, size } = req.query;
        try {
            // const tasks = await TaskRepository.getAll(page, size)
            const tasks = await TaskRepository.getAll()
            res.json(tasks.rows)
        } catch {
            res.status(500)
            res.json({errorMessage: "Unexpected error occurred on the server"})
        }
    }

    async getOneTask(req, res) {
        const id = req.params.id
        // todo: add id validator
        try {
            const task = await TaskRepository.getOne(id)
            res.json(task.rows)
        } catch {
            res.status(500)
            res.json({errorMessage: "Unexpected error occurred on the server"})
        }
    }

    async updateTask(req, res) {
        const {id, title, deadline, description, status} = req.body
        const task = {
            title,
            deadline,
            description,
            status
        }
        if (TaskValidator.isValid(task)) {
            task.id = id
            try {
                let newTask = await TaskRepository.updateOne(task)
                res.json(newTask)
            } catch (e) {
                res.status(500)
                res.json({errorMessage: "Unexpected error occurred on the server"})
            }
        } else {
            res.status(400)
            res.json({errorMessage: "Task's fields must not be empty"})
        }
    }

    async deleteTask(req, res) {
        const id = req.params.id
        // todo: add id validator
        try {
            const task = await TaskRepository.deleteOne(id)
            res.json(task.rows[0])
        } catch {
            res.status(500)
            res.json({errorMessage: "Unexpected error occurred on the server"})
        }
    }
}

module.exports = new TaskController()