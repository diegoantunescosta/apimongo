var mongoose = require('mongoose');
var user = require("../models/user");
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const objectId = require("mongoose").Types.ObjectId

const token = req.body.token;
const novaSenha = req.body.novaSenha;
const decoded = jwt.verify(token, "TOMAR-UM-BANHO-DE-CHUVA");

email = decoded.email;
senha = req.body.senhaAntiga;
senhaNova = req.body.senhaNova;

user.findOneAndUpdate({ "email" : email, "senha" : senha }, { "$set" : { "senha" : senhaNova } }, (err, result) => {
    if (err) {
        // console.log(err.code)
        res.status(201).json({
            "mensagem": "Falha ao redefinir senha"
        })
    } else {
        // console.log(result)
        res.status(200).json(result)
    }
})