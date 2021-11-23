const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const objectId = require("mongoose").Types.ObjectId
const Usuario = require("../models/user");
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
var UserController = require('../controllers/user');

router.post("/redefinirsenha/", UserController.redefinirSenha)

router.post("/login", UserController.login)

router.get("/usuarios", UserController.buscarTodos);

router.post("/usuario", UserController.cadastrar)
router.get("/usuario/:id", UserController.buscaUsuario)
router.delete("/usuario/:id", UserController.deletarUsuario)

router.post("/esqueceusenha", UserController.esqueciSenha)

router.post('/recuperar_senha', UserController.recuperarSenha);

module.exports = router