const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', (req, res) => {
    db.Todo.find()
        .then(todo => res.json(todo))
        .catch(err => res.send(err))
})

router.get('/:id', (req, res) => {
    db.Todo.findOne({_id: req.params.id})
        .then(todo => res.json(todo))
        .catch(err => res.send(err))
})

router.post('/', (req, res) => {
    db.Todo.create(req.body)
        .then(todo => res.json(todo))
        .catch(err => res.send(err))
})

router.put('/:id', (req, res) => {
    db.Todo.findOneAndUpdate({_id: req.params.id}, req.body)
        .then(todo => res.json(todo))
        .catch(err => res.send(err))
})

router.delete('/:id', (req, res) => {
    db.Todo.deleteOne({_id: req.params.id})
        .then(todo => res.json(todo))
        .catch(err => res.send(err))
})

module.exports = router