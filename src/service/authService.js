"use strict";

const jwksClient = require('jwks-rsa');

const client = jwksClient({
    jwksUri: 'url'
});

module.exports.getSigningKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.publicKey;
        callback(null, signingKey);
    });
};