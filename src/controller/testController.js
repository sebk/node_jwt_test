"use strict";

const jwt = require('jsonwebtoken');
const authService = require('../service/authService');

exports.callJwtTest = async (req, res, next) => {

    const token = req.get('Authorization');
    console.log('Provided token:\n', token);

    if (token) {
        jwt.verify(token, authService.getSigningKey, { algorithms: ['RS256'] }, (err, decoded) => {
            console.log("ERROR: ", err);
            console.log("Decoded: ", decoded);

            if (!err) {
                console.log('VALID access token');
                res.sendStatus(200).end();
            } else {
                console.log('INVALID access token!');
                res.sendStatus(401).end();
            }
        });
    } else {
        res.sendStatus(401).end();
    }
};

