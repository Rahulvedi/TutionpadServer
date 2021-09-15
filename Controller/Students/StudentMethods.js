const Student = require("../../schema/Student/studentSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getStudent=async(req,res)=>{
try{
  let tkn = req.user;
    let id = tkn.id;
    const student = await Student.findById({_id:id});
    res.send(student)
}catch (error) {
  console.log(error);
  res.send(error.message);
}
}
const registerStudent = async (req, res) => {
  try {
    const data = new Student(req.body);
    let hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    await data.save();
    const token = jwt.sign({ id: data.email }, process.env.skey, {
      expiresIn: "2h",
    });
    res.status(200).json({
      message: "ok",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.send("Email alredy exists");
  }
};
const loginStudent = async (req, res) => {
  // const data = req.body;
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (student) {
    let match = await bcrypt.compare(password, student.password);
    if (match) {
      const token = jwt.sign({ id: student._id }, process.env.skey, {
        expiresIn: "2h",
      });
      res.status(200).json({
        message: "ok",
        token: token,
      });
    } else {
      res.send("Invalid Password");
    }
  } else {
    res.send("Account not Found");
  }
};
const changePassword=async(req,res)=>{
  try{
    let tkn = req.user;
    let id = tkn.id;
    const data = await Student.findById({_id:id}) ;
    const dataPass = data.password;
    const oldPass = req.body.oldPassword;
    const newPass = req.body.newPassword;
    let result = await bcrypt.compare(oldPass, dataPass);
    if(result){
      let hash = await bcrypt.hash(newPass, 10);
      data.password = hash;
      await data.save();
    res.send('password change success!');
    }else{
      res.send('password not matched')
    }
  }catch (error) {
    console.log(error);
    res.send(error.message);
}
}
const updateStudent = async (req, res) => {
  console.log(req.file.path);
  try{
    let tkn = req.user;
    let id = tkn.id;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const phoneNumber=req.body.phoneNumber;
    const country=req.body.country;
    const city=req.body.city;
    const img=req.file.path;
    const student=await Student.findOneAndUpdate({_id:id},{
      username:firstName+' '+lastName,
      phoneNo:phoneNumber,
      image:img,
      country:country,
      city:city
     }
  )
  const newStudent=await Student.findById({_id:id});
  res.send(newStudent);
  }
  catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
module.exports = { registerStudent, loginStudent, updateStudent,changePassword,getStudent};
