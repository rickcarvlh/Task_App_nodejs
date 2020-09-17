const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth')
const router = new express.Router()

// * task related endpoints

// reponsible for creating new tasks
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})

// * updating tasks endpoints
// patch method
router.patch('/tasks/:id', auth, async (req, res) => {
    // validation
    const _id = req.params.id;
    const updates = Object.keys(req.body)
    const allowedUpadates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpadates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalida updates to task' })
    }


    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(4040).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})

// get  all task api
// * GET tasks?completed=true 
router.get('/tasks', auth, async (req, res) => {
    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {

        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// get tasks by id api
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        //const task = await Task.findById(_id)

        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

})

// * deleting tasks by id
router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id, owner: req.user._id
        })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router