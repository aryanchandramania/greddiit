const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SubSchema = new Schema({
    name        :   {type: String, required: 'NameInvalid', unique: true},
    description :   {type: String},
    owner       :   {type: String},
    tags        :   {type:Array},
    banned      :   {type:Array},
    sub_count   :   {type:String},
    members     :   {type:Array},
    banned_members: {type:Array},
    requests    :   {type:Array},
    posts       :   {type:Array},
    left_members:   {type:Array}
});

module.exports = Sub = mongoose.model("subs", SubSchema);