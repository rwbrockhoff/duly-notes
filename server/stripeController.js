const stripe = require('stripe');



module.exports = {
    getid: (req, res, next) => {
       
            const {sub} = req.session.user
            const dbInstance = req.app.get('db')
            console.log('into post')
           
            dbInstance.get_stripe().then( res => {
                console.log('our response', res)
            }).catch(error => console.log(error))
    }
}