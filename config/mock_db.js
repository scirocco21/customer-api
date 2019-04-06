'use strict;'

const Customer = require("../api/models/Customer.js");

module.exports = function() {
    return {
        customers : [
            {"id":1,"name":"Leshia Kingsly","address":"58265 3rd Center","phoneNumber":"998-341-9336","email":"lkingsly0@oakley.com","dob":"03291961"},
            {"id":2,"name":"Gusti Shallcroff","address":"3123 Esch Way","phoneNumber":"455-702-0084","email":"gshallcroff1@timesonline.co.uk","dob":"09042011"},
            {"id":3,"name":"Natassia Chillingworth","address":"7742 Anzinger Circle","phoneNumber":"444-366-5364","email":"nchillingworth2@virginia.edu","dob":"08201991"},
            {"id":4,"name":"Phyllys Chadd","address":"26364 Boyd Road","phoneNumber":"830-416-8207","email":"pchadd3@engadget.com","dob":"08051978"},
            {"id":5,"name":"Wilhelmine Ramsay","address":"2 Corry Pass","phoneNumber":"495-817-9176","email":"wramsay4@indiatimes.com","dob":"07101998"},
            {"id":6,"name":"Ingeborg Spanton","address":"388 Maple Wood Road","phoneNumber":"464-381-2338","email":"ispanton5@mediafire.com","dob":"08101982"},
            {"id":7,"name":"Carl Wellum","address":"46605 Hagan Pass","phoneNumber":"159-647-7526","email":"cwellum6@si.edu","dob":"06281980"},
            {"id":8,"name":"Adelind Stickels","address":"7743 Waubesa Hill","phoneNumber":"830-888-5340","email":"astickels7@lycos.com","dob":"07181962"},
            {"id":9,"name":"Bamby Dibner","address":"04 Goodland Plaza","phoneNumber":"738-588-1728","email":"bdibner8@domainmarket.com","dob":"02261998"},
            {"id":10,"name":"Carlin Roaf","address":"40 Heffernan Plaza","phoneNumber":"286-630-7868","email":"croaf9@purevolume.com","dob":"12151990"}
        ],

        save(customerData) {
            const customer = new Customer(customerData)
            const nextId = this.customers.length + 1;
            customer.id = nextId;
            this.customers.push(customer);
            return 1;            
        },
       
        find(id) {
            if(id) {
                return this.customers.find(customer => {
                        return customer.id == id;
                    });    
            }else {
                return this.customers;
            }
        },
       
        update(id, phoneNumber) {
            let customerIndex = this.customers.findIndex(customer => {
                return customer.id == id;
            });
            if (customerIndex !== -1) {
                this.customers[customerIndex].phoneNumber = phoneNumber;
                return 1;
            } else {
                return 0;
            }
        }        
    }
};  