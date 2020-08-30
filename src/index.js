const express = require('express');
require('./db/mongoose')
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// calling express package
const app = express();
const port = process.env.PORT || 3000;

// -> not used
/*
app.use((req, res, next) => {
    res.status()
    if (req.method === ('GET' || 'POST' || 'PATCH' || 'DELETE')) {
        res.status(503).send('Server under maintenance please try again later')
    }

})
*/

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
