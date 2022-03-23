const Router = require('express')
const router = new Router()
const taskController = require('../controller/task')

router.get('/tasks', taskController.getTasks);
router.get('/tasks/:id', taskController.getOneTask);
router.post('/tasks', taskController.createTask);
router.put('/tasks', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router