require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

app.use('/images', express.static(path.join(__dirname, 'public/images')));

//database
require('./database');

//middleware
const corsOptions = {
	origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
);
app.use(morgan('dev'));

//init router
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversation');
const messageRoute = require('./routes/message');

//use router
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images');
	},
	filename: function (req, file, cb) {
		cb(null, req.body.name);
	},
});
const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
	try {
		return res.status(200).json('File has been uploaded');
	} catch (error) {
		return res.status(500).json(error.message);
	}
});

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
