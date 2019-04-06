'use strict';
// Include mock "db"
const db = require('../../config/mock_db')();
// Exports all the functions to perform on the db
module.exports = {save, getOne, update, getByPhoneNumber};

//POST /customers operationId
function save(req, res, next) {
    res.json({success: db.save(req.body), description: "Movie added to the list!"});
}

function getByPhoneNumber(req, res, next) {
    let customers = db.find();
    let phoneNumber = req.swagger.params.phoneNumber.value;
    console.log(phoneNumber);
    let results = customers.filter(customer => {
        return customer.phoneNumber == phoneNumber
    })
    console.log(results)
    if(results.length !== 0) {
        res.json(results);
    } else {
        res.status(204).send();
    }
}

//GET /movie/{id} operationId
function getOne(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var customer = db.find(id);
    if(customer) {
        res.json(customer);
    }else {
        res.status(204).send();
    }        
}
//PUT /movie/{id} operationId
function update(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    console.log(id);
    var phoneNumber = req.body.phoneNumber;
    console.log(req.body.phoneNumber)
    if(db.update(id, phoneNumber)){
        console.log("I was hit")
        res.json({success: 1, description: "Phone number updated!"});
        console.log(res)
    }else{
        res.status(204).send();
    }
}