const express = require('express')
const router = express.Router()
const todo = require('../controllers/todo')

router.route('/')
    .get(todo.index)
    .post(todo.create)
    .delete(todo.deleteAll)

router.route('/:id')
    .get(todo.read)
    .put(todo.update)
    .delete(todo.delete)

module.exports = router