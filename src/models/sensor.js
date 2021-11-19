var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sensorSchema = new Schema({
    umidadeSolo: { type: Number },
    luminosidade: { type: Number },
    temperatura: { type: Number },
    umidade: { type: Number },
    hic: { type: Number },
    createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("sensor", sensorSchema);
