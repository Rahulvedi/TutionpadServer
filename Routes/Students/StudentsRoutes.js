const express = require('express')
const router = express.Router()
const Methods=require('../../Controller/Students/StudentMethods')
const mid = require('../../middlewares/jwtverify')
var multer = require('multer');
const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./ProfilePicture/Students")
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+'-' +file.originalname)
    }
})
const uploads=multer({ 
storage:fileStorageEngine
})



router.get("/",(req,res)=>{
    res.send("hii from backend");
})
router.get('/getuser',mid.verifyToken,Methods.getStudent);
router.post('/register-student',Methods.registerStudent);
router.post('/login-student',Methods.loginStudent);
router.post('/changepassword',mid.verifyToken,Methods.changePassword)
router.post('/updatestudent',mid.verifyToken,uploads.single('img'),Methods.updateStudent)
module.exports = router;