const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors');
const path = require('path');

require('dotenv').config()


const connect = require("./src/config/db");

const app = express();

app.use(cors({
    origin:"*"
}))
app.use(express.json())

// // MongoDB Connection
// mongoose.connect(process.env.mongoUrl, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//   })
    // .then(() => console.log('Connected to MongoDB'))
    // .catch((error) => console.error('MongoDB connection error:', error));
  
  // Serve static files from the uploads folder
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
  // Import and use the upload route
  const uploadRoutes = require('./src/controllers/images.controller');
  const userRoutes  = require('./src/controllers/user.controller')
  app.use('/api',uploadRoutes);
  app.use('/api',userRoutes)
  
app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(5001,async()=>{
    await connect();
    console.log(`Listening on Port ${5001}`)
})