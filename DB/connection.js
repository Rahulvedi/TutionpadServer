const dotenv =require('dotenv')
const mongoose = require("mongoose");
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch(() => {
    console.log("Connection Failed");
  });
