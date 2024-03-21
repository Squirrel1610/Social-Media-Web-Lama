const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// create a post
router.post("/", async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        return res.status(200).json({
            success: true,
            message: "Created post successfully"
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
})

// update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) { 
            await post.updateOne({
                $set: req.body
            })

            return res.status(200).json({
                success: true,
                message: "Updated post successfully"
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "You can only update your post"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
})

// delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) { 
            await Post.findByIdAndDelete(post.id);

            return res.status(200).json({
                success: true,
                message: "Deleted post successfully"
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "You can only delete your post"
            })
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
})

// get a post 
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Get post successfully",
            data: post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
})

// like and dislike post
router.put("/:id/like", async (req, res) => {
    try {
        const userId = req.body.userId;
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(userId)) {
            await post.updateOne({
                $push: { likes: userId }
            })

            return res.status(200).json({
                success: true,
                message: "Post is liked"
            })
        } else {
            await post.updateOne({
                $pull: { likes: userId }
            })

            return res.status(200).json({
                success: true,
                message: "Post is unliked"
            })
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        }) 
    }
})

// get timeline posts 
router.get("/timeline/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const currentUserPosts = await Post.find({
            userId: currentUser.id
        })
        const friendsPosts = await Promise.all(currentUser.followings.map((friendId) => Post.find({ userId: friendId })));

        return res.status(200).json({
            success: true,
            message: "Get timeline of user successfully",
            data: currentUserPosts.concat(...friendsPosts)
        })
    } catch (e) {
        return res.status(500).json({
            success: false, 
            message: e.message
        })
    }
})

module.exports = router;