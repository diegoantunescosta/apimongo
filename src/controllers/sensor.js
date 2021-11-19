var mongoose = require('mongoose');
var Sensor = require("../models/sensor");
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const objectId = require("mongoose").Types.ObjectId;
const bcrypt = require('bcryptjs');

const logger = require('heroku-logger');

exports.create = function(req, res, next) {

    logger.info('Chamou', { dados: req.body })

    const obj = new Sensor(req.body);
    
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

    Sensor.find({ "createAt" : { $gte : new Date("2021-10-28T19:00:00Z") } }, { }, { limit: 40000, sort: { createAt: -1 } }, (err, docs) => {
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