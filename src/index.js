const express = require('express');
require('./db/mongoose')
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user')

// calling express package
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter)


// * task related endpoints

// task api creating
app.post('/tasks', async (req, res) => {
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
app.patch('/tasks/:id', async (req, res) => {
    // validation
    const _id = req.params.id;
    const updates = Object.keys(req.body)
    const allowedUpadates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpadates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalida updates to task' })
    }


    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { runValidators: true });
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
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// get tasks by id api
app.get('/tasks/:id', async (req, res) => {
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
app.delete('/tasks/:id', async (req, res) => {
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



app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
