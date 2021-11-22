const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')
const morgan = require("morgan");
const mongoose = require("mongoose");

const userRouter = require("./src/routes/user");
const objectiveRouter = require("./src/routes/objective");
const keyresultRouter = require("./src/routes/keyresult");
const sensorRouter = require("./src/routes/sensor");

mongoose.connect('mongodb+srv://diegoantunes32:140813kd@cluster0.ifc5n.mongodb.net/sensor?retryWrites=true&w=majorityy', { useNewUrlParser: true }); 
mongoose.Promise = global.Promise;

app.use(cors());

app.all(function (req, res, next) {

    var origin = req.get('origin'); 

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', origin);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan('dev'));

app.use("/user", userRouter);
app.use("/objective", objectiveRouter);
app.use("/keyresult", keyresultRouter);
app.use("/sensor", sensorRouter);
// app.use("/comentarios", comentarios);
// app.use("/paginas", paginasMonitoradas);


app.use((req, res, next) => {
    const erro = new Error("Não encontrado");
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app;
