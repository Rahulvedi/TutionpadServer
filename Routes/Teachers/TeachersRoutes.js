const express = require('express')
const Methods=require('../../Controller/Teachers/TeacherMethods')
const mid = require('../../middlewares/jwtverify')
const router = express.Router()
var multer = require('multer');
const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./ProfilePicture/Teachers")
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+'-' +file.originalname)
    }
})
const uploads=multer({ 
storage:fileStorageEngine
})



router.post('/register',Methods.registerTeacher);
router.post('/login',Methods.loginTeacher);
router.get('/getteacher',mid.verifyToken,Methods.getTeacher)
router.post('/changepassword',mid.verifyToken,Methods.changePassword)
router.post('/update',mid.verifyToken,uploads.single('img'),Methods.updateTeacher)
module.exports = router;
