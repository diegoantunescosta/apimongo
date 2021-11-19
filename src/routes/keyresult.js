const express = require("express");
const router = express.Router();

var KeyresultController = require('../controllers/keyresult');

router.route('/')
    .get(KeyresultController.getAll)
    .post(KeyresultController.create)
    .post(KeyresultController.update)

router.route('/:id')
    .get(KeyresultController.getOne)
    .delete(KeyresultController.delete)

module.exports = router