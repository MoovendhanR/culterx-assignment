const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

const connect = require("./config/db");

const app = express();

app.get("/",(req,res)=>{
    res.send("Home Page");
})


app.listen(process.env.port,async()=>{
    await connect();
    console.log(`Listening on Port ${process.env.port}`)
})