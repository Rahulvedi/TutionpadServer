const Student = require("../../schema/Student/studentSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerStudent = async (req, res) => {
  try {
    const data = new Student(req.body);
    let hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    //   data.img = req.file.filename;
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
      const token = jwt.sign({ id: student.email }, process.env.skey, {
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
const UpdateProfileImg = async (req, res) => {
  console.log(req.file.path);
  res.send("file succesfully saved");
};
module.exports = { registerStudent, loginStudent, UpdateProfileImg };
