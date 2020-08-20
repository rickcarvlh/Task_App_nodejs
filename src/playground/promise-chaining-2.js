require('../db/mongoose')
const Task = require('../models/task')


// 5f3d40bc134d44513ceaae4e


/*
Task.findByIdAndDelete('5f3e88035b89c35bb4d47003').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})
*/

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}


deleteTaskAndCount('5f3eaf98ab36f91fb4836e38').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})