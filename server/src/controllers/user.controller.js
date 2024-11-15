const express =require('express');
const mongoose = require('mongoose');
const jwt=require("jsonwebtoken");
const User = require('../models/user.model');
const bcrypt = require('bcrypt')


const router = express.Router();


router.get("/user",async(req, res) => {
     try{
        const users = await User.find().lean().exec();
       res.status(200).send({users:users})
     }catch(err){
        res.status(500).send({message:err.message});
     }
})
router.post("/register",async(req, res) => {
    const {email, password , name, age} = req.body
    try{
       bcrypt.hash(password, 5, async(err,secure_password) => {
              if(err) {
               console.error(err)
              }else{
                 const user=await User.create({email,password:secure_password,name,age});
                 res.status(201).send(user)
              }
       })
    }catch(err){
       res.status(500).send({message:err.message});
    }
})
router.post("/login",async(req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.find({email});
        const hashed_password = user[0].password
        if(user.length > 0){
            bcrypt.compare(password, hashed_password, (err, result) => {
                // result == true
                if(result) {
                    const token = jwt.sign({ userID: user[0]._id }, 'masai');//payload ,secret key
                    res.status(201).send({"mes":"login successfull","token":token});
                }else{
                    res.status(500).send("wrong credentials")
                }
            });
          }else{
             res.status.send("wrong credential")
          }
    }catch(err){
       res.status(500).send({message:err.message});
    }
})

router.get('/:id', async(req, res) => {
   try{
       const note=await User.findById(req.params.id).lean().exec();
       res.status(200).send(note);
   }catch(err){
       res.status(500).send({message:err.message})
   }
})


// router.get("/data",async(req, res) => {
// var token=req.headers.authorization
// jwt.verify(token,"masai",(err,decoded)=>{
// if(err){
// res.send("Invalid Token")
// console.log(err)
// } else {
// res.send("Data ....")
// }
// })

// })




module.exports=router;