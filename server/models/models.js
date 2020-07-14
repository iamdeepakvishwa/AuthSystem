const mongoose = require('mongoose');

var {Schema} = mongoose;

//Name
//username
//Password
//Confirm Password
//email

const userEntrySchema = new Schema({
    Name : {
        type:String,
        required: true,
    },
    username : {
        type :String,
        min:4,
        max:25,
        unique:true,
        required: "username can't be empty"
    },
    email:{
        type :String,
        unique:true,
        required: "username can't be empty",
    },
    password:{
        type:String,
        min:6,
        required: true
    }
});

const userEntry = mongoose.model('userEntry',userEntrySchema);

module.exports = userEntry;