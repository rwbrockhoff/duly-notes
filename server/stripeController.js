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

            //     console.log('res', res)
            //    stripe.customers.createSource(
            //         customer_id,
            //         { source: card },
            //         console.log('error:', err, 'card:',card) {
            //           // asynchronously called
            //         }
            //       );

            //    stripe.createSource(card, {
            //        type: 'sepa_debit',
            //        currency:'usd',
            //        owner: {
            //            name: 'Joe Bob'
            //        }
            //    }).then(result => {
            //        console.log('source result:', result)
            //    })

            // }).catch(error => console.log(error))
    }) }}


// stripe.createSource(iban, {
//     type: 'sepa_debit',
//     currency: 'eur',
//     owner: {
//       name: 'Jenny Rosen',
//     },
//   }).then(function(result) {
//     // Handle result.error or result.source
//   });

// stripe.customers.createSource(
//     "cus_DLb0S4DQ57t9Hn",
//     { source: "tok_visa" },
//     function(err, card) {
//       // asynchronously called
//     }
//   );

// stripe.createSource(card, ownerInfo).then(function(result) {
//     if (result.error) {
//       // Inform the user if there was an error
//       var errorElement = document.getElementById('card-errors');
//       errorElement.textContent = result.error.message;
//     } else {
//       // Send the source to your server
//       stripeSourceHandler(result.source);