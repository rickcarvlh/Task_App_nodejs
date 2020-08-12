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

const me = new User({
    name: 'Ricardo',
    age: 35
})

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log('Error: ', error);
})

