const db = require('../models')

exports.index = (req, res) => {
    db.Todo.find()
        .then(todo => res.json(todo))
        .catch(err => res.send(err))
}

exports.read = (req, res) => {
    db.Todo.findOne({_id: req.params.id})
        .then(todo => res.json(todo))
        .catch(err => res.send(err))
}

exports.create = (req, res) => {
    db.Todo.create(req.body)
        .then(todo => res.json(todo))
        .catch(err => res.send(err))
}

exports.update = (req, res) => {
    db.Todo.findOneAndUpdate({_id: req.params.id}, req.body)
        .then(todo => res.json(todo))
        .catch(err => res.send(err))
}

exports.delete = (req, res) => {
    db.Todo.deleteOne({_id: req.params.id})
        .then(todo => res.json(todo))
        .catch(err => res.send(err))
}

exports.deleteAll = (req, res) => {
    db.Todo.deleteAll()
        .then(todo => res.json(todo))
        .catch(err => res.send(err))
}

module.exports = exports