var mongoose = require('mongoose');
var user = require("../models/user");
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const objectId = require("mongoose").Types.ObjectId;
const bcrypt = require('bcryptjs');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'mentto.edu@gmail.com', // generated ethereal user
        pass: 'Mentto2020' // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false 
    }
});

exports.buscarTodos = function(req, res, next) {
    user.find({}, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        } else {
            res.status(200).json(result)
        }
    })
}

exports.esqueciSenha = function(req, res, next) {
    email = req.body.email;

    user.findOne({
        "email": email
    }, (err, result) => {
        if (err) {
            res.status(400).json({
                "mensagem": "Não encontrado"
            })
        } else {
            if (result) {

            const token = jwt.sign({
                    email: req.body.email,
                    nome: result.nomeCompleto
                },
                "TOMAR-UM-BANHO-DE-CHUVA", {
                    expiresIn: "2 days"
                });

            conteudo_email = `Oi ${result.nomeCompleto},<br><br>
                Esqueceu sua senha? Tudo bem, não nos esquecemos de você! Clique no link a seguir para redefinir sua senha.<br><br>
                https://octopus-project.herokuapp.com/recuperar-senha?token=${token} <br><br>
                Se somente clicando não funcionar, você pode copiar e colar o link na barra de endereços do seu navegador.<br><br>
                Se você não pediu para redefinir sua senha, simplesmente ignore este e-mail.<br><br>
            `;

            var mailOptions = {
                from: 'octopusprojectoficial@gmail.com',
                to: email,
                subject: 'Recuperação de Conta Octopus Project',
                html: conteudo_email
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    // res.status(500).res({
                    //     "mensagem" : "deu ruim"
                    // })
                    console.log('enviado' + error);
                } else {
                    console.log('E-mail Enviado: ' + info.response);
                    // res.status(200).json({
                    //     "mensagem" : "Email enviado com sucesso"
                    // });
                }
            });

            res.status(200).json({
                "mensagem" : "Email enviado com sucesso"
            })
        } else {
            res.status(400).json({
                'mensagem' : 'e-mail não encontrado'
            });
        }
        }


    });
}

exports.redefinirSenha = function(req, res) {

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

};

exports.recuperarSenha = function(req, res, next) {

    const token = req.body.token;
    const novaSenha = req.body.novaSenha;
    const decoded = jwt.verify(token, "TOMAR-UM-BANHO-DE-CHUVA");
    console.log(decoded);
    tokenDecodificado = decoded;
    console.log(tokenDecodificado);

    user.findOneAndUpdate({ "email" : decoded.email },{ "$set" : { "senha" : novaSenha } },(err, result) => {
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


}

exports.cadastrar = function(req, res) {
    
    const hash = bcrypt.hashSync(req.body.password, 10);
    
    const usuario = new user({
        name: req.body.name,
        email: req.body.email,
        password: hash
    });
    
    usuario.save((err, result) => {
        if (err) {
            // console.log(err.code)
            res.status(201).json({
                "mensagem": "Falha ao efetuar o cadastro"
            })
        } else {
            var token = jwt.sign({userID: result._id, email: req.body.email}, 'TOMAR-UM-BANHO-DE-CHUVA', {expiresIn: '2h'});
            res.status(201).json({"status" : "ok", "token" : token});
        }
    })
};

exports.login = function(req, res) {

    user.findOne({email:req.body.email}, (err, result) => {
        if (err) {

            res.status(401).json({
                "mensagem": "Erro"
            });

        } else {

            if (result != null) {

                isEqual = bcrypt.compareSync(req.body.password, result.password);
    
                if (isEqual) {
                    var token = jwt.sign({userID: result._id, email: req.body.email}, 'TOMAR-UM-BANHO-DE-CHUVA', {expiresIn: '2h'});
                    res.status(202).json({"status" : "ok", "token" : token, "name" : result.name});
                } else {
                    res.status(401).json({"message": "error"})
                }
            
            } else {
            
                res.status(404).json({"message": "not found account"})
            
            }

        }
    })
}

exports.buscaUsuario = function(req, res) {
    user.findById({_id: req.params.id}, (err, result) => {
        if (err) {
            // console.log(err)
            res.status(500).json({
                erro: "Usuario não encontrado"
            })
        } else {
            // console.log(result);
            res.status(200).json(result)
        }
    })
};

exports.deletarUsuario = function(req, res) {
    try {
        user.deleteOne({_id: objectId(req.params.id)}, (err, result) => {
            if (err) {
                // console.log(err)
                res.status(500).json({
                    error: err
                })
            } else if (result.n === 1){
                // console.log(result)
                res.status(200).json({
                    "mensagem": "ok"
                })
            } else {
                res.status(500).json({
                    "mensagem": "não encontrado"
                })
            }
        })
    } catch (error) {
        console.log("Erro")
    }
};
