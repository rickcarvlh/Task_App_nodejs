require('../db/mongoose')
const User = require('../models/user')


// 5f3d40bc134d44513ceaae4e

/*
User.findByIdAndUpdate('5f3e7f35e4172e4858fd4dce', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e);
})
*/

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5f3e7f35e4172e4858fd4dce', 2).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})