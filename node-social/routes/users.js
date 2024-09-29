const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Update user
router.put("/:id", async (req, res) => {
	try {
		if (req.body.userId === req.params.id || req.body.isAdmin) {
			if (req.body.password) {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			}
			const { isAdmin, ...body } = req.body;
			await User.findByIdAndUpdate(req.params.id, {
				$set: body,
			});

			return res.status(200).json({
				success: true,
				message: "Updated user successfully",
			});
		} else {
			return res.status(400).json({
				success: false,
				message: "Not found user",
			});
		}
	} catch (e) {
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
});

//Delete user
router.delete("/:id", async (req, res) => {
	try {
		if (req.body.userId === req.params.id || req.body.isAdmin) {
			await User.findByIdAndDelete(req.params.id);

			return res.status(200).json({
				success: true,
				message: "Deleted user successfully",
			});
		} else {
			return res.status(400).json({
				success: false,
				message: "Not found user",
			});
		}
	} catch (e) {
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
});

//Get a user
router.get("/", async (req, res) => {
	try {
		const { userId, username } = req.query;
		const user = userId
			? await User.findById(userId)
			: await User.findOne({ username });
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Not found user",
			});
		}

		const { password, updatedAt, ...other } = user._doc;

		return res.status(200).json({
			success: true,
			message: "Get user successfully",
			data: other,
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
});

// follow a user
router.put("/:id/follow", async (req, res) => {
	try {
		const { currentUserId } = req.body;
		if (req.params.id !== currentUserId) {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(currentUserId);

			if (!user.followers.includes(currentUser.id)) {
				Promise.all([
					user.updateOne({
						$push: {
							followers: currentUser.id,
						},
					}),
					currentUser.updateOne({
						$push: {
							followings: user.id,
						},
					}),
				]);

				return res.status(200).json({
					success: true,
					message: "The user has been followed",
				});
			} else {
				return res.status(400).json({
					success: false,
					message: "You have already followed this user",
				});
			}
		} else {
			return res.status(400).json({
				success: false,
				message: "You can't follow yourself",
			});
		}
	} catch (e) {
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
});

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
	try {
		const { currentUserId } = req.body;
		if (req.params.id !== currentUserId) {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(currentUserId);

			if (user.followers.includes(currentUser.id)) {
				Promise.all([
					user.updateOne({
						$pull: {
							followers: currentUser.id,
						},
					}),
					currentUser.updateOne({
						$pull: {
							followings: user.id,
						},
					}),
				]);

				return res.status(200).json({
					success: true,
					message: "The user has been unfollowed",
				});
			} else {
				return res.status(400).json({
					success: false,
					message: "You haven't follow this user yet",
				});
			}
		} else {
			return res.status(400).json({
				success: false,
				message: "You can't unfollow yourself",
			});
		}
	} catch (e) {
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
});

module.exports = router;
