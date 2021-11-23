var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true},
    createAt: {type: Date, default: Date.now},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    permission: {type: Number, default: 0}
})

module.exports = mongoose.model("users", userSchema);
