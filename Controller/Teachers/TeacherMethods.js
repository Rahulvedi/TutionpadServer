const Teacher = require("../../schema/Teacher/teacherSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerTeacher = async (req, res) => {
  try {
    const data = new Teacher(req.body);
    if (data.password.length < 6) {
      res.send("Password in too small");
    } else {
      let hash = await bcrypt.hash(data.password, 10);
      data.password = hash;
      await data.save();
      res.send("ok");
    }
  } catch (error) {
    res.status(400).send("email alredy exists");
  }
};
const loginTeacher = async (req, res) => {
  // const data = req.body;
  const { email, password } = req.body;
  const teacher = await Teacher.findOne({ email });
  if (teacher) {
    let match = await bcrypt.compare(password, teacher.password);
    if (match) {
      const token = jwt.sign({ id: teacher._id }, process.env.skey, {
        expiresIn: "2h",
      });
      res.status(200).json({
        message: "ok",
        token: token,
      });
    } else {
      res.status(400).send("invalid password");
    }
  }else{
    res.send("Account not Found");
  }
};
const getTeacher = async (req, res) => {
  try{
    let tkn = req.user;
    let id = tkn.id;
    const teacher = await Teacher.findById({_id:id});
    res.send(teacher)
  }catch(error){
    console.log(error);
    res.send(error.message);
  }
};
const changePassword=async (req,res)=>{
  try{
    let tkn = req.user;
    let id = tkn.id;
    const data = await Teacher.findById({_id:id}) ;
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
const updateTeacher=async (req,res)=>{
  try{
    let tkn = req.user;
    let id = tkn.id;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const phoneNumber=req.body.phoneNumber;
    const country=req.body.country;
    const city=req.body.city;
    const address=req.body.address;
    const img=req.file.path;
    const teacher=await Teacher.findOneAndUpdate({_id:id},{
      username:firstName+' '+lastName,
      phoneNo:phoneNumber,
      image:img,
      country:country,
      city:city,
      address:address
     }
  )
  const newTeacher=await Teacher.findById({_id:id});
  res.send(newTeacher);
  }
  catch (error) {
    console.log(error);
    res.send(error.message);
  }
}
module.exports = { registerTeacher, loginTeacher, getTeacher,changePassword,updateTeacher};
