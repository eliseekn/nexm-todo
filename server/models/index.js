const mongoose = require('mongoose')

mongoose.set('debug', true)
mongoose.connect("mongodb://localhost:3002/nexm-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.Promise = Promise

module.exports.Todo = require('./todo')