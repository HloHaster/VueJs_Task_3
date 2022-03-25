const db = require('../db')

const INSERT_QUERY = 'INSERT INTO task (title, deadline, description, status) values ($1, $2, $3, $4) RETURNING id'
const GET_ALL_QUERY = 'SELECT * FROM task ORDER BY task.id LIMIT $2 OFFSET (($1-1) * $2)'
const GET_ONE_QUERY = 'SELECT * FROM task WHERE id = $1'
const UPDATE_QUERY = 'UPDATE task SET title = $1, deadline = $2, description = $3, status = $4 WHERE id = $5 RETURNING *'
const DELETE_QUERY = 'DELETE FROM task WHERE id = $1 RETURNING *'

class TaskRepository {
    async create(task) {
        const id = await db.query(INSERT_QUERY, [task.title, task.deadline, task.description, task.status])
        return id.rows[0].id
    }

    async getAll(page, size) {
       return await db.query(GET_ALL_QUERY, [page, size])
    }

    async getOne(id) {
        return await db.query(GET_ONE_QUERY, [id])
    }

    async updateOne(task) {
        const newTask = await db.query(UPDATE_QUERY, [task.title, task.deadline, task.description, task.status, task.id])
        return await newTask.rows[0]
    }

    async deleteOne(id) {
        return await db.query(DELETE_QUERY, [id])
    }
}

module.exports = new TaskRepository()