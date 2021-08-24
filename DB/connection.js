const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Tutionpad', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
module.exports=mongoose.connection;