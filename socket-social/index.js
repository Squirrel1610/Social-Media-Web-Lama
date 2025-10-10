const io = require('socket.io')(5005, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

const users = new Set();
let userAndSocketData = [];

const addUser = (userId, socketId) => {
	if (!users.has(userId)) {
		users.add(userId);
		userAndSocketData.push({
			userId,
			socketId,
		});
	}
};

const removeUser = (socketId) => {
	const userId = userAndSocketData.find((u) => u.socketId === socketId)?.userId;
	userAndSocketData = userAndSocketData.filter((u) => u.socketId !== socketId);
	users.delete(userId);
};

const getUser = (userId) => {
	return userAndSocketData.find((u) => u.userId === userId);
};

io.on('connection', (socket) => {
	// when connected
	console.log('a user connected!');
	socket.on('addUser', (userId) => {
		addUser(userId, socket.id);
		io.emit('getUsers', userAndSocketData);
	});

	// send and get message
	socket.on('sendMessage', ({ senderId, receiverId, text }) => {
		const receiver = getUser(receiverId);
		if (receiver) {
			io.to(receiver.socketId).emit('getMessage', {
				senderId,
				text,
			});
		}
	});

	// when disconnected
	socket.on('disconnect', () => {
		console.log('a user disconnected!');
		removeUser(socket.id);
		io.emit('getUsers', userAndSocketData);
	});
});
