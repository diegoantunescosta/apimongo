const express = require("express");
const router = express.Router();

const path = require("path");

var SensorController = require('../controllers/sensor');

router.route('/')
    .get(SensorController.getAll)
    .post(SensorController.create);

router.route('/dashboard')
    .get((req, res) => {
        res.sendFile(path.join(process.cwd(), 'src', 'pages', 'dashboard.html'));
    })

module.exports = router