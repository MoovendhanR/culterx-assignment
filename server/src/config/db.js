const mongoose = require('mongoose');
require('dotenv').config()
const mongoUrl="mongodb+srv://moovendhanr:moovendhanr@cluster0.btfpnf7.mongodb.net/culterx?retryWrites=true&w=majority"

const connect=async()=>{
    return await mongoose.connect(mongoUrl,{})//useNewUrlParser: true
}

module.exports = connect;