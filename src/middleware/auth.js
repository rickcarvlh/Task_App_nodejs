const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        // TODO não concordo muito com isto
        const decoded = jwt.verify(token, 'thisismynewcourse')
        // checks if the user token is still valid
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        
        req.token = token
        // the user work is chosen by me
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = auth