const mongoose = require("mongoose");
require("dotenv").config();

class Database {
    constructor(){
        this.connect();
    }

    async connect(){
        try {
            await mongoose.connect(process.env.MONGODB_URL);
            console.log("MongoDB connected successfully");
        } catch (e) {
            console.log("Fail to connect MongoDB");
            console.log(e.message);
            process.exit(1);
        }
    }
}

module.exports = new Database();