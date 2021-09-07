const express = require('express')
const Methods=require('../../Controller/Teachers/TeacherMethods')
const router = express.Router()


router.post('/register-teacher',Methods.registerTeacher);
router.post('/login-teacher',Methods.loginTeacher);
module.exports = router;
