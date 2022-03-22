const taskModel = require('../models/task');
let mongoose = require('mongoose')

module.exports = {
    find: function (req, res) {
        taskModel
            .find()
            .then(tasks => {
                res.json(tasks)
            })
            .catch(e => {
                res.status(500)
                res.json({errorMessage: "Unexpected error occurred on the server"})
            })
    },

    findOne: function (req, res) {
        const {id} = req.params;
        if (mongoose.Types.ObjectId.isValid(id)) {
            taskModel
                .findOne({"_id": id})
                .then(task => {
                    res.json(task)
                })
                .catch(e => {
                    res.status(404)
                    res.json({errorMessage: "There is no entity with such id"})
                })
        } else {
            res.status(400)
            res.json({errorMessage: "Id is invalid"})
        }
    },

    create: function (req, res) {
        const task = req.body
        let newTask = new taskModel(task)

        newTask.save()
            .then(newTask => {
                res.json(newTask)
            })
            .catch(e => {
                res.status(500)
                res.json({errorMessage: "Unexpected error occurred on the server"})
            })
    },
    remove: function (req, res) {
        const {id} = req.params
        if (mongoose.Types.ObjectId.isValid(id)) {
            taskModel
                .findByIdAndDelete(id)
                .then(task => {
                    res.json(task)
                })
                .catch(e => {
                    res.status(404)
                    res.json({errorMessage: "There is no entity with such id"})
                })
        } else {
            res.status(400)
            res.json({errorMessage: "Id is invalid"})
        }
    }
}