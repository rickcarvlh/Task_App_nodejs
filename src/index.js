const express = require('express');
require('./db/mongoose')
const User = require('./models/user');
const Task = require('./models/task');

// calling express package
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


// user api creating

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// get users api

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

// get users by id api

// * needs to have a valid id -> 12 or 24 numbers
app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})



// task api creating
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })

})

// get  all task api
app.get('/tasks', (req, res) => {
    Task.find({}).then((task) => {
        res.status(200).send(task)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// get tasks by id api
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
