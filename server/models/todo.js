const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    },

    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Todo', schema)