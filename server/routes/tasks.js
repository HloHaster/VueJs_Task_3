const express = require('express')
const tasksController = require('../controllers/tasks');

const router = express.Router()

router.get('/tasks', tasksController.find);
router.get('/tasks/:id', tasksController.findOne);
router.post('/tasks', tasksController.create);
router.delete('/tasks/:id', tasksController.remove);

module.exports = router