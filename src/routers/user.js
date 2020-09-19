const express = require('express');
const multer = require('multer');
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

// * user related routes

// user api creating
// * CREATE USER ENDPOINT
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        // generate token for saved user
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

//  * LOGIN ENDPOINT
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(500).send()
    }
})

// * logout route from all routes
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// * logout from all sessions
router.post('users/logout', auth, async (req, res) => {
    try {
        // clear array of sessions
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()

    }
})


router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// get users by id api

// * updating users endpoints
// patch method :
// The HTTP methods PATCH can be used to update partial resources
router.patch('/users/me', auth, async (req, res) => {

    // validation
    const updates = Object.keys(req.body)
    const allowedUpadates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpadates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates ' })
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// * deleting users -> only runs if user is auth
router.delete('/users/me', auth, async (req, res) => {

    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)

    }
})

const upload = multer({
    dest: 'src/avatars'
})

// * POST upload endpoint
router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {

    try {
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e)
    }

})

module.exports = router
