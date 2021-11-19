var mongoose = require('mongoose');
var Keyresult = require("../models/keyresult");
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const objectId = require("mongoose").Types.ObjectId;
const bcrypt = require('bcryptjs');

exports.create = function(req, res, next) {

    let keyr = new Keyresult(req.body);
    
    keyr.save(req.body, (err, result) => {
        if (err) {
            res.status(401).json({
                "message": "Error: impossible save this object"
            })
        } else {
            res.status(201).json({
                "message" : "Created!", "object" : result
            });
        }
    })

}

exports.getAll = function(req, res, next) {

    Keyresult.find((err, docs) => {
        if (err) {
            res.status(500).json({
                "message": "Error: impossible use this transaction"
            })
        } else {
            res.status(200).json({
                "message" : "Ok!", "object" : docs
            });
        }
    })

}

exports.getOne = function(req, res, next) {

    Keyresult.findOne({_id: req.params.id}, (err, docs) => {
        if (err) {
            res.status(500).json({
                "message": "Error: impossible use this transaction"
            })
        } else {
            res.status(200).json({
                "message" : "Ok!", "object" : docs
            });
        }
    })

}

exports.update = function(req, res, next) {

    Keyresult.updateOne(req.body, (err, docs) => {
        if (err) {
            res.status(401).json({
                "message": "Error: impossible use this operation"
            })
        } else {
            res.status(201).json({
                "message" : "Ok!", "object" : docs
            });
        }
    })

}

exports.delete = function(req, res, next) {

    Keyresult.deleteOne({_id: req.params.id}, (err, docs) => {
        if (err) {
            res.status(500).json({
                "message": "Error: impossible use this operation"
            })
        } else {
            res.status(200).json({
                "message" : "Ok!", "object" : docs
            });
        }
    })

}