'use strict';

const app = require('../index');
const chai = require('chai');
const sinon = require('sinon');
const authService = require('../service/authService');
const request = require('supertest');
const expect = chai.expect;

describe('Test controller', () => {

    let authServiceMock;

    const PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----\n' +
        'public key\n' +
        '-----END PUBLIC KEY-----';
    const BEARER_TOKEN = 'Bearer token';


    before(() => {
        authServiceMock = sinon.stub(authService, 'getSigningKey');
        authServiceMock.callsFake(() => {
            // It seems that this is not called, maybe my test setup is wring?
            console.log('authService getJWTSecret called');
            return PUBLIC_KEY;
        });
    });

    it('returns 200 when JWT is provided', (done) => {
        request(app)
            .get('/test')
            .set('Authorization', BEARER_TOKEN)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('returns 401 when JWT is not provided', (done) => {
        request(app)
            .get('/test')
            .set('Authorization', BEARER_TOKEN)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(401);
                done();
            });
    });
});