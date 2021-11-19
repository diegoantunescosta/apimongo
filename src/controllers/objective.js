var mongoose = require('mongoose');
var Objective = require("../models/objective");
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const objectId = require("mongoose").Types.ObjectId;
const bcrypt = require('bcryptjs');

exports.create = function(req, res, next) {

    const obj = new Objective(req.body);
    
    obj.save((err, result) => {
        if (err) {
            res.status(401).json({
                "message": "Error: impossible save this object",
                'error': err
            })
        } else {
            res.status(201).json({
                "message" : "Created!", "object" : result
            });
        }
    })

}

exports.getAll = function(req, res, next) {

    Objective.find((err, docs) => {
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

    Objective.findOne({_id: req.params.id}, (err, docs) => {
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

    Objective.updateOne( { _id: req.body._id }, req.body, (err, docs) => {
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

    Objective.deleteOne({_id: req.params.id}, (err, docs) => {
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