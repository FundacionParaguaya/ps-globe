const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const location = require('./mockLocation')

io.on('connection', function(socket) {
  console.log('an user connected')
})

let count = 0

function send() {
  io.emit('msg', location(count))
  console.log(location(count).id)
  count++
}

setInterval(send, 10000)

http.listen(8000, function() {
  console.log('listening on *:8000')
})
