module.exports = {
    createcustomer: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log('hit dat customer')
    }
}