const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo