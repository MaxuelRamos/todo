const chai = require('chai');

const request = require('supertest');
const app = require('../src/index');

const dbCleaner = require('./config/dbCleaner');
const dbPopulate = require('./config/dbPopulate');

const expect = chai.expect;

let userToken;
let adminToken;

describe('Companies API Integration Tests', () => {
  beforeEach(async () => {
    await dbCleaner();
    await dbPopulate();

    userToken = (await request(app)
      .put('/api/auth')
      .send({ username: 'user@ponto.com', password: '123456' })).body.token;

    adminToken = (await request(app)
      .put('/api/auth')
      .send({ username: 'admin@ponto.com', password: '123456' })).body.token;
  });

  describe('#GET /companies', () => {
    it('admin should get all companies', (done) => {
      request(app)
        .get('/api/companies')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          done();
        });
    });

    it('user should not get all companies', (done) => {
      request(app)
        .get('/api/companies')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
  });
});

after(() => {
  process.exit();
});
