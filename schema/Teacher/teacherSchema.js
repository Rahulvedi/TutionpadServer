const mongoose = require('mongoose');
const teacher= new mongoose.Schema({
    username:{
        type:String,
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
    address:{
        type:String,
    }
})
const Teacher= new mongoose.model('Teacher',teacher);
module.exports = Teacher;