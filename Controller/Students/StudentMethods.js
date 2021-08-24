const Student = require('../../schema/Student/studentSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addStudent = async(req,res) =>{
    try {
      const data = new Student(req.body);
          let hash = await bcrypt.hash(data.password, 10);
          data.password = hash;
        //   data.img = req.file.filename;
           await data.save();
        res.send("ok");
    } catch (error) {
        res.send('Email alredy exists');
    }
  }
  const loginStudent=async(req,res)=>{
    // const data = req.body;
    const {email,password} = req.body;
    const student = await Student.findOne({email});;
    let match = await bcrypt.compare(password, student.password);
    if(match){
      res.send('ok')
    }
    else{
      res.send('Invalid Password')
    }

  }
  module.exports = {addStudent,loginStudent}