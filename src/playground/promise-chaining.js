require('../db/mongoose')
const User = require('../models/user')


// 5f3d40bc134d44513ceaae4e


User.findByIdAndUpdate('5f3e7f35e4172e4858fd4dce', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e);
})
/*

    (node: 17860) DeprecationWarning: Mongoose: 
    `findOneAndUpdate()` and`findOneAndDelete()` 
    without the`useFindAndModify`
     option set to false are deprecated.
     See: https://mongoosejs.com/docs/deprecations.html#findandmodify
{
    */