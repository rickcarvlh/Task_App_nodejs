const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
// loading jwt token
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
        minlength: 7,
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
    // tokens array of objects
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

}, {
    timestamps: true
})

// virtual property
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// * hide private data
userSchema.methods.toJSON = function () {
    const user = this
    // raw profile data
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.token

    return userObject
}

// * custom function -> allows the this keyword
userSchema.methods.generateAuthToken = async function () {
    const user = this
    // TODO  existe uma manneira mais correta para fazer o segredo de certeza é ver depois
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    // concatening the token to the array
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token

}

// *  find user bt credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// *  hash the plaintext password
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({ owner: user._id })

    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User;