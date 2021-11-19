var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var objectiveSchema = new Schema({
    name: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    endAt: { type: Date, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    done: { type: Boolean, default: false },
})

module.exports = mongoose.model("objectives", objectiveSchema);
