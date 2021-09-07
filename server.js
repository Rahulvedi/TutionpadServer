const express = require('express');
const app = express();
const cors=require('cors')
const path = require('path');
const port = process.env.PORT||3001;
require('./DB/Connection')
const uploads = path.join(__dirname,"./ProfilePicture")
app.use('/ProfilePicture',express.static(uploads));
app.use(express.json())
const Students = require('./Routes/Students/StudentsRoutes')
const Teachers = require('./Routes/Teachers/TeachersRoutes')
const Admin=require('./Routes/Admin/AdminRoutes')
// Routes
app.use(cors())
app.use("/admin", Admin)
app.use("/students", Students)
app.use("/teachers", Teachers)

app.listen(port,()=>{
    console.log(console.log(`runnning at ${port}`))
})