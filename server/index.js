const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const todo = require('./routes/todo')

const server = express()
const port = process.env.PORT || 3001

server.use(cors({origin: '*'}))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use('/api/todo', todo)

server.listen(port, '', () => {
    console.log('Server running on port ' + port)
})