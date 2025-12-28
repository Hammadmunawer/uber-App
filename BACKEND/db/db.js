const mongoose = require('mongoose');

function connectDB() {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB successfully");
        })
        .catch((err) => {
            console.error("Failed to connect to MongoDB:", err.message);
        });
}

module.exports = connectDB;
