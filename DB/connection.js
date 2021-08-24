const mongoose = require("mongoose");
const DB ="mongodb+srv://rahul:rahulvedi@cluster0.xmehz.mongodb.net/tutionpad?retryWrites=true&w=majority";
mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log("Connection Failed");
  });
