const Teacher = require('../../schema/Teacher/teacherSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addTeacher = async(req,res) =>{
    try {
      const data = new Teacher(req.body);
          let hash = await bcrypt.hash(data.password, 10);
          data.password = hash;
         await data.save();
        res.send("ok");
    } catch (error) {
        res.status(400).send('email alredy exists');
    }
  }
  const loginTeacher=async(req,res)=>{
    // const data = req.body;
    const {email,password} = req.body;
    const teacher = await Teacher.findOne({email});;
    let match = await bcrypt.compare(password, teacher.password);
    if(match){
      res.send('ok').status(200)
    }
    else{
      res.status(400).send('invalid password')
    }

  }
  module.exports = {addTeacher,loginTeacher}