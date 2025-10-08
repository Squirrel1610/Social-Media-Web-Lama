const io = require('socket.io')(5005, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on('connection', (socket) => {
    console.log('a user connected')
})