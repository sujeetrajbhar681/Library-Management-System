const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/libraryDB")
        .then(() => {
            console.log("MongoDB Connected to libraryDB");
        })
        .catch((err) => {
            console.log("DB Connection Error:", err);
        });
};

module.exports = { connectDB };
