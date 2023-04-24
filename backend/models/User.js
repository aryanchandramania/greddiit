const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    first       :   {type: String, required: 'FirstNameInvalid'},
    last        :   {type: String},
    username    :   {type: String, required: 'UsernameInvalid'},
    email       :   {type: String, unique: true, lowercase: true, required: 'EmailInvalid', sparse:true},
    age         :   {type: Number},
    contact     :   {type: Number},
    password    :   {type: String, required: 'PasswordInvalid'},
    followers   :   Array, // will be an array of email ids
    following   :   Array,
});

module.exports = User = mongoose.model("users", UserSchema);