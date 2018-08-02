const stripe = require('stripe');



module.exports = {
    createcustomer: (req, res, next) => {
    const dbInstance = req.app.get('db');


const customer = stripe.customers.create({
  email: 'jenny.rosen@example.com',
  source: 'src_18eYalAHEMiOZZp1l9ZTjSU0',
});
    }
}