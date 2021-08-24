const express = require('express');
const path = require('path');
const app = express();
const cors=require('cors')
const port = process.env.PORT||3001;
require('./DB/Connection')
app.use(express.json())
const Students = require('./Routes/Students/StudentsRoutes')
const Teachers = require('./Routes/Teachers/TeachersRoutes')
// Routes
app.use(cors())
app.use("/students", Students)
app.use("/teachers", Teachers)

app.listen(port,()=>{
    console.log(console.log(`runnning at ${port}`))
})