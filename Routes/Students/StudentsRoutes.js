const express = require('express')
const router = express.Router()
const Methods=require('../../Controller/Students/StudentMethods')
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
router.post('/upload-profile-picture',uploads.single('img'),Methods.UpdateProfileImg)
router.post('/register-student',Methods.registerStudent);
router.post('/login-student',Methods.loginStudent)
module.exports = router;