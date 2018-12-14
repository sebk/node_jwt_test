'use strict';

const express = require('express');
const router = require('./router/testRouter');
const app = express();
const port = process.env.PORT || 8082;

app.use('/', router);

app.listen(port, () => {
    console.log('Running Service on port ' + port);
});

module.exports = app;