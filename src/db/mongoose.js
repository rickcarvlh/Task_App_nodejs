const mongoose = require('mongoose')

// ! o primeiro esta deprecated mas por laguma razão precisa dos dois aqui
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})









