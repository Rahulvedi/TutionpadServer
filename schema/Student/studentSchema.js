const mongoose = require('mongoose');
const student = new mongoose.Schema({
    username: {
        type: String
    },
    phoneNo:{
        type:Number
    },
    email: {
        type: String,
        unique:true
    },
    password: {
        type: String,
    },
    country:{
        type: String,
    },
    city:{
        type: String,
    },
    DOB:{
        type: Date,
    },
    class:{
        type: String,
    },
    image:{
        type:String,
    }
  })

const Student = new mongoose.model('Student', student);
module.exports = Student;