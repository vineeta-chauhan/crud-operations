const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Phone_Number: {
        type: Number,
        required: true,
        unique: true
    },
    Address: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    }
   
});

userSchema.plugin(uniqueValidator);


exports.User = mongoose.model("User", userSchema);;
