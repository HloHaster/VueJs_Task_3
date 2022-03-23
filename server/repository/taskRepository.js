const db = require('../db')

const INSERT_QUERY = 'INSERT INTO task (title, deadline, description, status) values ($1, $2, $3, $4) RETURNING id'
const GET_QUERY = 'SELECT * FROM task'

class TaskRepository {
    async create(task) {
        return await db.query(INSERT_QUERY, [task.title, task.deadline, task.description, task.status])[0].id
    }

    async getAll() {
       return await db.query(GET_QUERY)
    }
}

module.exports = new TaskRepository()