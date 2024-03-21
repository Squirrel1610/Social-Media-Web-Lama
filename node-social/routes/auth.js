const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const salt = await bcrypt.genSaltSync(10);
        const hashedPw = await bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPw
        })

        await newUser.save();

        return res.status(200).json({
            success: true,
            message: "Register successfully"
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
})

// login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Wrong email or password"
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Wrong email or password"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Login successful"
        })
    } catch (e) {
        
    }
})

module.exports = router;