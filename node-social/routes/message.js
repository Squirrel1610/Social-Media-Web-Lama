const router = require('express').Router();
const Message = require('../models/Message');

// create a message
router.post('/', async (req, res) => {
	try {
		const newMessage = await new Message(req.body).save();

		res.status(200).json({
			success: true,
			message: 'Created message successfully',
			data: newMessage,
		});
		return;
	} catch (e) {
		res.status(500).json({
			success: false,
			message: e.message,
		});
		return;
	}
});

// get messages in conversation
router.get('/:conversationId', async (req, res) => {
	try {
		const messages = await Message.find({ conversationId: req.params.conversationId });

		res.status(200).json({
			success: true,
			message: 'Get messages in conversation successfully',
			data: messages || [],
		});
		return;
	} catch (e) {
		res.status(500).json({
			success: false,
			message: e.message,
		});
		return;
	}
});

module.exports = router;
