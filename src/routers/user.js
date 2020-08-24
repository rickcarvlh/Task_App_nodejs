const express = require('express');
const User = require('../models/user')
const router = new express.Router()

// * user related routes

// user api creating

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// get users api

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

// get users by id api

// * needs to have a valid id -> 12 or 24 numbers

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

// * updating users endpoints
// patch method :
// The HTTP methods PATCH can be used to update partial resources
router.patch('/users/:id', async (req, res) => {

    // validation
    const _id = req.params.id;
    const updates = Object.keys(req.body)
    const allowedUpadates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpadates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates ' })
    }

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { runValidators: true });
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// * deleting users
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)

    }
})

module.exports = router
