var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var keyresultSchema = new Schema({
    name: { type: String, required: true },
    objective: { type: Schema.Types.ObjectId, ref: 'objectives', required: true },
    initialValue: { type: Number, required: true },
    endValue: { type: Number, required: true },
    createAt: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    done: { type: Boolean, default: false },
    changeIn: { type: Date, default: Date.now }
})

module.exports = mongoose.model("keyresult", keyresultSchema);
