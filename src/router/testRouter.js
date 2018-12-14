"use strict";

const express = require('express');
const controller = require('../controller/testController');

let router = express.Router();

router.get('/test', async (req, res, next) => {
    await controller.callJwtTest(req, res, next);
});

module.exports = router;