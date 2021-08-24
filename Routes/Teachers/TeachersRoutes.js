const express = require('express')
const Methods=require('../../Controller/Teachers/TeacherMethods')
const router = express.Router()
router.get("/",(req,res)=>{
    res.send("hii from backend");
})
router.post('/addteacher',Methods.addTeacher);
router.post('/login-teacher',Methods.loginTeacher);
module.exports = router;
