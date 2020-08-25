const express = require('express');
const Task = require('../models/task');
const router = new express.Router()

// * task related endpoints

// task api creating
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send()
    }

})

// * updating tasks endpoints
// patch method
router.patch('/tasks/:id', async (req, res) => {
    // validation
    const _id = req.params.id;
    const updates = Object.keys(req.body)
    const allowedUpadates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpadates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalida updates to task' })
    }


    try {
        const task = await Task.findById(_id)
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        // const task = await Task.findByIdAndUpdate(_id, req.body, { runValidators: true });
        if (!task) {
            return res.status(4040).send()
        }
        res.send(task)
    }
    catch (e) {
        res.status(500).send(e)
    }

})

// get  all task api
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// get tasks by id api
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

})

// * deleting tasks by id
router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router