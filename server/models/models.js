const mongoose = require('mongoose');
const uniqueValidation = require('mongoose-unique-validator');

var {Schema} = mongoose;

//Name
//username
//Password
//Confirm Password
//email

const userEntrySchema = new Schema({
    name : {
        type:String,
        required: true,
        validate: {
            validator: (v)=> {
              return /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/.test(v);
            },
            message: props => `${props.value} is not a valid Name `
        },
    },
    username : {
        type :String,
        minlength:4,
        maxlength:25,
        unique:true,
        validate: {
            validator: (v)=> {
              return /(^[a-zA-Z0-9_]+$)/.test(v);
            },
            message: props => `${props.value} is not a valid username `
        },
        required: [true,"username can't be empty"]
    },
    email:{
        type :String,
        unique:true,
        required: [true,"Email can't be empty"],
    },
    password:{
        type:String,
        minlength:[8, "password length must be 8 characters long"],
        required: true
    }
});

userEntrySchema.plugin(uniqueValidation,{ message: `{VALUE} already taken. please try another one` });

const userEntry = mongoose.model('userEntry',userEntrySchema);

module.exports = userEntry;