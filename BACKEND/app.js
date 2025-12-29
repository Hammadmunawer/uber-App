
require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');
const connectDB= require('./db/db');
const userRoutes = require('./routes/user.route');
connectDB()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("hello world");
});

app.use('/api/users', userRoutes);

module.exports = app;
