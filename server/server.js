const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('./config/mongoose')
require('dotenv').config()
const path = require('path')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()

app.set('port', process.env.PORT || 5000)
app.use(bodyParser.json())

const httpServer = createServer(app)
const io = new Server(httpServer, {
  path: '/socket'
})

io.on('connection', socket => {
    console.log('emit event');
    io.emit('event', { data: 'worked successfully!' });
})

// connect to the database
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

// Routes
app.use('/api/players', require('./routes/api/players'))
app.use('/api/signup', require('./routes/api/signup'))
app.use('/api/login', require('./routes/api/login'))
app.use('/api/edit', require('./routes/api/edit'))
app.use('/api/delete', require('./routes/api/delete'))
app.use('/api/comment', require('./routes/api/comment'))
app.use('/api/report', require('./routes/api/report'))

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../client/build'))

  app.get('/*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  })
}

httpServer.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})
