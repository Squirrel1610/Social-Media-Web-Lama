require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

//database
require("./database");

//middleware
const corsOptions = {
    origin: 'http://localhost:3000'
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

//init router
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

//use router
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})