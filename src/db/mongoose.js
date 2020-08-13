const mongoose = require('mongoose')

// ! o primeiro esta deprecated mas por laguma razão precisa dos dois aqui
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: 'Learn the Mongoose library',
    completed: false
})

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log(error);
})

/*
const me = new User({
    name: 'Ricardo',
    age: 35
})

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log('Error: ', error);
})
*/

