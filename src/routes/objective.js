const express = require("express");
const router = express.Router();

var ObjectiveController = require('../controllers/objective');

router.route('/')
    .get(ObjectiveController.getAll)
    .post(ObjectiveController.create)
    .put(ObjectiveController.update)

router.route('/:id')
    .get(ObjectiveController.getOne)
    .delete(ObjectiveController.delete)

module.exports = router