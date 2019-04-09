var request = require('supertest');
var server = require('../../../app');
var api = request('http://localhost:10010');

describe('controllers', function () {

  describe('get customer by id', function () {
    it('should render index.html at the root path', function(done) {
      api.get('/')
        .expect(200, done);
    });
  })

  describe('get customer by id', function () {

    it('should return a 200 response if customer exists', function (done) {
      api.get('/customers/1')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
    it('should return a 404 response if customer does not exists', function (done) {
      api.get('/customers/199')
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

  describe('get customers by phone number', function () {
    it('returns a 404 status code where no record exists', function (done) {
      api.get('/customers?phoneNumber=123-456-7890')
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('returns success where a customer can be matched', function (done) {
      api.get('/customers?phoneNumber=159-647-7526')
        .set('Accept', 'application/json')
        .expect(200, done);
    })
  })

  describe('create new customer', function () {

    it('responds with a 201 status code when successfully creating a customer', function (done) {
      let customer = {
        name: "Bob",
        address: "123 Boulevard, Astoria",
        email: "bob@gmail.com",
        phoneNumber: "1234567890",
        dob: "01101980"
      }

      api.post('/customers')
        .send(customer)
        .set('Accept', 'application/json')
        .expect(201, done)
    });

    it('responds with a 400 status code when receiving bad input', function (done) {
      let customer = {
        name: "Bob",
        address: "123 Boulevard, Astoria",
        email: "nope",
        phoneNumber: "1234567890",
        dob: "01101980"
      }

      api.post('/customers')
        .send(customer)
        .set('Accept', 'application/json')
        .expect(400, done)
    });

    it('responds with a 400 status code when receiving empty email field', function (done) {
      let customer = {
        name: "Bob",
        address: "123 Boulevard, Astoria",
        email: "",
        phoneNumber: "1234567890",
        dob: "01101980"
      }

      api.post('/customers')
        .send(customer)
        .set('Accept', 'application/json')
        .expect(400, done)
    });

    it('responds with a 400 status code when receiving empty phone number field', function (done) {
      let customer = {
        name: "Bob",
        address: "123 Boulevard, Astoria",
        email: "",
        phoneNumber: "1234567890",
        dob: "01101980"
      }

      api.post('/customers')
        .send(customer)
        .set('Accept', 'application/json')
        .expect(400, done)
    });

    it('responds with a 400 status code when receiving duplicate email address', function (done) {
      let customer = {
        name: "Bob",
        address: "123 Boulevard, Astoria",
        email: "lkingsly0@oakley.com",
        phoneNumber: "1234567890",
        dob: "01101980"
      }

      api.post('/customers')
        .send(customer)
        .set('Accept', 'application/json')
        .expect(400, done)
    });
  })
  
  describe('update phone number', function () {
    it('responds with a 400 status code when sending invalid phone number', function (done) {
      let phoneNumber = "123";

      api.put('/customers/1')
        .send({phoneNumber: phoneNumber})
        .set('Accept', 'application/json')
        .expect(400, done)
    })

    it('responds with a 200 status code when successfully updating phone number', function (done) {
      let phoneNumber = "516-665-1666";

      api.put('/customers/1')
        .send({phoneNumber: phoneNumber})
        .set('Accept', 'application/json')
        .expect(200, done)
    })
  })
});
