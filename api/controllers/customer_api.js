'use strict';
// Include mock "db"
const db = require('../../config/mock_db')();
// Make all the functions performed on the db accessible as operationIds in swagger.yaml file
module.exports = { save, getOne, update, getByPhoneNumber };

function save(req, res, next) {
  const exitCode = db.save(req.body)
  if (exitCode === 1) {
    res.status(201).json({ description: "New customer added to database!" });
  } else if (exitCode === 2) {
    res.status(400).json({ description: "A user with this email address already exists" })
  } else if (exitCode === 0) {
    res.status(400).json({ description: "Invalid Input. Try again" })
  }
}

function getByPhoneNumber(req, res, next) {
  const customers = db.find();
  const phoneNumber = req.swagger.params.phoneNumber.value.replace(/\D/g, '');
  const results = customers.filter(customer => {
    return customer.phoneNumber == phoneNumber
  })
  if (results.length !== 0) {
    res.status(200).json(results);
  } else {
    res.status(404).json({ description: "Could not find a customer with that number" });
  }
}

function getOne(req, res, next) {
  const id = req.swagger.params.id.value;
  const customer = db.find(id);
  if (customer) {
    res.status(200).json(customer);
  } else {
    res.status(404).json({ description: "Could not find a customer with that id" });
  }
}

function update(req, res, next) {
  const id = req.swagger.params.id.value;
  const phoneNumber = req.body.phoneNumber;
  if (db.update(id, phoneNumber)) {
    res.status(200).json({ description: "Phone number updated!" });
  } else {
    res.status(400).json({ description: "Something went wrong. Did you enter a valid phone number?" });
  }
}