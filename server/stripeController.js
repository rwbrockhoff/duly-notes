const stripe = require('stripe');



module.exports = {
    getid: (req, res, next) => {
       
            const {sub} = req.session.user
            const dbInstance = req.app.get('db')
           
           
            dbInstance.get_stripe(sub).then( res => {
                // const ownerInfo = {
                //     name: req.body.token.card.name 
                // }
           
                const ownerInfo = {
                    name: req.session.user.name 
                }
                
               const {id} = req.body.card;
               const {customer_id} = res;

    }) }}
