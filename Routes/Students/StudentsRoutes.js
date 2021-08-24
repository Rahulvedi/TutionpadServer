const express = require('express')
const router = express.Router()
const Methods=require('../../Controller/Students/StudentMethods')

router.get("/",(req,res)=>{
    res.send("hii from backend");
})
router.post('/addstudent',Methods.addStudent);
router.post('/login-student',Methods.loginStudent)
module.exports = router;