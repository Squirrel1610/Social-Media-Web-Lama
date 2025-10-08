const router = require('express').Router();
const Conversation = require('../models/Conversation');

// create a conversation
router.post('/', async (req, res) => {
	try {
		const newConversation = new Conversation({
			members: [req.body.senderId, req.body.receiverId],
		});

		await newConversation.save();
		res.status(200).json({
			success: true,
			message: 'Created conversation successfully',
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

// get user's conversation
router.get('/:userId', async (req, res) => {
	try {
		const conversation = await Conversation.find({
			members: { $in: [req.params.userId] },
		});
		if (conversation) {
			res.status(200).json({
				success: true,
				message: 'Get conversation of user successfully',
				data: conversation,
			});
			return;
		} else {
			res.status(404).json({
				success: false,
				message: 'Not found conversation of user ' + req.params.userId,
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			success: false,
			message: e.message,
		});
		return;
	}
});

// get conversation includes two userId
router.get('/find/:firstUserId/:secondUserId', async (req, res) => {
	try {
		const conversation = await Conversation.findOne({
			members: { $all: [req.params.firstUserId, req.params.secondUserId] },
		});
		if (conversation) {
			res.status(200).json({
				success: true,
				message: 'Found conversation having these users',
				data: conversation,
			});
			return;
		} else {
			res.status(404).json({
				success: false,
				message: 'Not found conversation having these users'
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			success: false,
			message: e.message,
		});
		return;
	}
});

module.exports = router;
