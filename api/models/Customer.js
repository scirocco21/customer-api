class Customer {
    constructor(customer) {
        this.id = customer.id;
        this.name = customer.name;
        this.email = customer.email;
        this.address = customer.address;
        this.phoneNumber = customer.phoneNumber;
        this.dob = customer.dob;
    }
}

module.exports = Customer;