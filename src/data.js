let faker = require("faker");
faker.seed(100);

let categories = ["Watersports", "Soccer", "Chess", "Running"];
let products = [];

for(let i = 1; i <= 503; ++i) {
    let category = faker.helpers.randomize(categories);
    products.push({
        id: i,
        name: faker.commerce.productName(),
        category: category,
        description: `${category}: ${faker.lorem.sentence(3)}`,
        price: Number(faker.commerce.price())
    })
}

let orders = [];

for (let i = 1; i <= 103; ++i) {
    let name = faker.name.firstName();
    let last = faker.name.lastName();
    let order = {
        id: i,
        name: `${name} ${last}`,
        email: faker.internet.email(name, last),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        zip: faker.address.zipCode(),
        country: faker.address.country(),
        shipped: faker.random.boolean(),
        products: [],
    }

    let productCount = faker.random.number({min: 1, max: 5});
    let productIDS = [];

    while (productIDS.length < productCount) {
        let candidateID = faker.random.number({min: 1, max: products.length});
        if (productIDS.indexOf(candidateID) === -1) {
            productIDS.push(candidateID);
        }
    }

    for (let j = 0; j < productCount; j++) {
        order.products.push({
            quantity: faker.random.number({min: 1, max: 10}),
            product_id: productIDS[j],
        })
    }

    orders.push(order);
}

module.exports = () => ({categories, products, orders})