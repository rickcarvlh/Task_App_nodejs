const mongoose = require('mongoose')
const validator = require('validator')

// ! o primeiro esta deprecated mas por laguma razão precisa dos dois aqui
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,

        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age muust be a positive number.');
            }
        }
    },

})


const me = new User({
    name: 'Mike',
    email: 'MYEMAIL@MEAD.IO',
    password: 'sporting84'

})

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log(error);
})


/*
const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})*/


