'use strict;'

const Customer = require("../api/models/Customer.js");

module.exports = function () {
  return {
    customers: [
      { "id": 1, "name": "Leshia Kingsly", "address": "58265 3rd Center", "phoneNumber": "9983419336", "email": "lkingsly0@oakley.com", "dob": "03291961" },
      { "id": 2, "name": "Gusti Shallcroff", "address": "3123 Esch Way", "phoneNumber": "4557020084", "email": "gshallcroff1@timesonline.co.uk", "dob": "09042011" },
      { "id": 3, "name": "Natassia Chillingworth", "address": "7742 Anzinger Circle", "phoneNumber": "444-366-5364", "email": "nchillingworth2@virginia.edu", "dob": "08201991" },
      { "id": 4, "name": "Phyllys Chadd", "address": "26364 Boyd Road", "phoneNumber": "8304168207", "email": "pchadd3@engadget.com", "dob": "08051978" },
      { "id": 5, "name": "Wilhelmine Ramsay", "address": "2 Corry Pass", "phoneNumber": "4958179176", "email": "wramsay4@indiatimes.com", "dob": "07101998" },
      { "id": 6, "name": "Ingeborg Spanton", "address": "388 Maple Wood Road", "phoneNumber": "4643812338", "email": "ispanton5@mediafire.com", "dob": "08101982" },
      { "id": 7, "name": "Carl Wellum", "address": "46605 Hagan Pass", "phoneNumber": "1596477526", "email": "cwellum6@si.edu", "dob": "06281980" },
      { "id": 8, "name": "Adelind Stickels", "address": "7743 Waubesa Hill", "phoneNumber": "8308885340", "email": "astickels7@lycos.com", "dob": "07181962" },
      { "id": 9, "name": "Bamby Dibner", "address": "04 Goodland Plaza", "phoneNumber": "7385881728", "email": "bdibner8@domainmarket.com", "dob": "02261998" },
      { "id": 10, "name": "Carlin Roaf", "address": "40 Heffernan Plaza", "phoneNumber": "2866307868", "email": "croaf9@purevolume.com", "dob": "12151990" }
    ],

    save(customerData) {

      const email = customerData.email;
      const duplicate = this.customers.find(customer => {
        return customer.email == email
      })
      // send back specific error message in case user attempts to create duplicate record
      if (duplicate) {
        return 2;
        // only save customers with distinct email addresses
      } else if (!duplicate & this.validateInput(customerData)) {
        const id = this.customers.length + 1;
        const sanitizedPhoneNumber = customerData.phoneNumber.replace(/\D/g, '');
        const normalizedEmail = email.toLowerCase();
        const customer = new Customer({
          id: id,
          name: customerData.name,
          phoneNumber: sanitizedPhoneNumber,
          email: normalizedEmail,
          dob: customerData.dob,
          address: customerData.address
        })
        this.customers.push(customer);
        return 1;
        // otherwise complain about invalid input 
      } else {
        return 0
      }
    },

    // ======= VALIDATIONS ======== 
    // save only digits to db; display them prettier to users later
    validatePhoneNumber(phoneNumber) {
      const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '');
      // assume US numbers have at least 10 digits and may not exceed 12, as per the specifications
      return sanitizedPhoneNumber.length <= 12 && sanitizedPhoneNumber.length >= 10
    },

    // emails of the form string@string.string are okay
    validateEmail(email) {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(email);
    },

     validateName(name) {
      return name.length <= 100;
    },

    validateAddress(address) {
      return address.length <= 255;
    },

    // ignore non-numeric characters
    validateDoB(dob) {
      return dob.replace(/\D/g, '').length === 8
    },

    validateInput(customerData) {
      return this.validateEmail(customerData.email)
        && this.validateName(customerData.name)
        && this.validateAddress(customerData.address)
        && this.validatePhoneNumber(customerData.phoneNumber)
        && this.validateDoB(customerData.dob)
    },

    find(id) {
      if (id) {
        return this.customers.find(customer => {
          return customer.id == id;
        });
      } else {
        // find() without parameter will return all customers in db
        return this.customers;
      }
    },

    update(id, phoneNumber) {
      const customerIndex = this.customers.findIndex(customer => {
        return customer.id == id;
      });
      // only update valid phone numbers
      if (customerIndex !== -1 && this.validatePhoneNumber(phoneNumber)) {
        this.customers[customerIndex].phoneNumber = phoneNumber;
        return 1;
      } else {
        return 0;
      }
    }
  }
};  