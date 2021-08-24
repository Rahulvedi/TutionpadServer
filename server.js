const express = require('express');
const path = require('path');
const app = express();
const cors=require('cors')
const port = process.env.PORT||3001;
app.use(express.json())
const DB=require('./DB/connection')
DB.on('error', console.error.bind(console, 'connection error:'));
DB.once('open', function () {
    console.log("we are connected to mongodb");
});
const Students = require('./Routes/Students/StudentsRoutes')
const Teachers = require('./Routes/Teachers/TeachersRoutes')
// Routes
app.use(cors())
app.use("/students", Students)
app.use("/teachers", Teachers)

app.listen(port,()=>{
    console.log(console.log(`runnning at ${port}`))
})