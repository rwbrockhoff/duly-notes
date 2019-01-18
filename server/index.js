const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const axios = require('axios');
let sessionId = 45;
require('dotenv').config();
const controller = require('./controller');

const stripe = require('stripe')(process.env.STRIPE_KEY)

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(express.static(`${__dirname}/../build`));

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: '*/*' }));

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
}).catch(error => {
    console.log('Massive Error:', error)
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

//---DB Requests-----//
app.get('/api/auth/checkuser', controller.checkuser)

app.post('/api/auth/register', controller.register)

app.post('/api/logout', controller.logout)

app.get('/api/notes', controller.getnotes)

app.put('/api/note', controller.updatenote)

app.put('/api/note/title', controller.updatenotetitle)

app.delete('/api/note/:id', controller.deleteNote)

app.post('/api/note', controller.createnote)

app.put('/api/theme', controller.changetheme)

app.get('/api/getpomodoro', controller.getpomodoro)

app.put('/api/addpomodoro', controller.addpomodoro)

app.put('/api/pomodorotoggle', controller.pomodorotoggle)

app.put('/api/memorygradient', controller.memorygradient)

//-------------------//

app.get('/auth/callback', async (req, res) => {
    const { PROTOCOL } = process.env
    const payload = {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `${PROTOCOL}://${req.headers.host}/auth/callback`
    };
    //----get token---//

    let receiveToken = await axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)

    //----exchange token---//

    let receiveUser = await axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${receiveToken.data.access_token}`)

    //-----user data-----//
    req.session.user = receiveUser.data;
    req.session.user.id = sessionId;
    sessionId++




    //redirect based on user's subscription status

    const { sub, name, email } = req.session.user
    const dbInstance = req.app.get('db')

    dbInstance.check_user(sub).then(response => {
        var firstNote = {
            title: 'Your First Note',
            content: '	<h1 class="md-block-header-one">Willkommen! </h1><h2 class="md-block-header-two">This is your very <em class="md-inline-italic">first</em> note. </h2><p class="md-block-unstyled">I just wanted to point out some features. </p><ul class="md-block-unordered-list-item"><li>- + space creates a bullet point. </li></ul><ol class="md-block-ordered-list-item"><li> 1 + space creates a numbered list. </li></ol><p class="md-block-unstyled">And if you select the word &quot;Willkommen,&quot; you&#x27;ll see your new inline toolbar where</p><p class="md-block-unstyled">you can apply <span class="md-inline-highlight">highlights,</span> add a <a class="md-inline-link" href="http://www.dulynotes.com" target="_blank" rel="noopener noreferrer">link</a>, or even</p><blockquote class="md-block-blockquote">create a blockquote.</blockquote><p class="md-block-unstyled">Hitting the control key will toggle your notes sidebar on and off screen. </p><p class="md-block-unstyled">Hitting the up and down arrows will toggle your pomodoro on and off screen. </p>',
            author_id: sub
        }


        if (!response[0]) {
            dbInstance.create_user([sub, name, email]).then(() => {

                dbInstance.insertfirstnote([firstNote.title, firstNote.content, firstNote.author_id])


            })

            res.redirect('/#/signup')
        }

    })

    //Grab Stripe ID using Google Sub

    dbInstance.get_stripe(sub).then(customer => {

        if (customer[0].customer_id) {

            const { customer_id } = customer[0]
            stripe.customers.retrieve(customer_id).then(customer => {

                const { total_count } = customer.subscriptions

                if (total_count === 1) {
                    res.redirect('/#/texteditor')
                }
                else {
                    res.redirect('/#/signup')
                }
            })
        }
        else {
            res.redirect('/#/signup')
        }
    })





})

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/#/');
    res.sendStatus(200);
})

app.get('/api/user-data', (req, res) => {
    res.json({ user: req.session.user });
})

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.send();
})

//---------STRIPE----------//
const headers = {
    api_key: process.env.STRIPE_KEY,
};

app.post('/api/payment', (req, res) => {


    const { email, name, sub } = req.session.user
    //Create Customer on Stripe
    const customer = stripe.customers.create({
        description: name,
        email: email
    })
        .then((res) => {
            const dbInstance = req.app.get('db')
            //add Stripe Customer ID to DB
            dbInstance.add_stripe_cust_id([res.id, sub])

                .then(user => {
                    //create source 
                    stripe.customers.createSource(
                        user[0].customer_id,
                        { source: req.body.token.id, }).then(card => {
                            //create subscription
                            stripe.subscriptions.create({
                                customer: user[0].customer_id,
                                items: [
                                    {
                                        plan: process.env.PLAN_ID,
                                    },
                                ]
                            }).catch(error => {
                                console.log('sub-error: ', error)
                            })
                            res.sendStatus(200);
                        })

                }).catch(error => {
                    console.log('addstripeid-error: ', error)
                })

        })

    res.status(200).send('processed')
})


app.put('/api/updatecard', (req, res) => {


    const { sub } = req.session.user
    const dbInstance = req.app.get('db')

    //Grab Stripe ID using Google Sub
    dbInstance.get_stripe(sub).then(customer => {
        const { customer_id } = customer[0]

        //create new source
        stripe.customers.createSource(customer_id,
            { source: req.body.token.id }).then(res => {
                //retreive customer object
                stripe.customers.retrieve(customer_id).then(customer => {
                    //find new source just created and make it default
                    const { id } = customer.sources.data[1]
                    stripe.customers.update(customer_id, {
                        default_source: id

                    })
                })
            })
    })
    res.sendStatus(200)
})

app.put('/api/cancelsub', (req, res) => {
    const { sub } = req.session.user
    const dbInstance = req.app.get('db');

    dbInstance.get_stripe(sub).then(customer => {
        const { customer_id } = customer[0]

        stripe.customers.retrieve(customer_id).then(customer => {
            const { id } = customer.subscriptions.data[0]

            stripe.subscriptions.del(id, { at_period_end: true }).then(cus => {
                res.status(200).send(cus)
            })

        })

    })

})


app.get('/api/verify', (req, res) => {

    if (req.session.user) {
        const { sub, name, email } = req.session.user
        const dbInstance = req.app.get('db')

        dbInstance.check_user(sub).then(response => {
            var firstNote = {
                title: 'Your First Note',
                content: '	<h1 class="md-block-header-one">Willkommen! </h1><h2 class="md-block-header-two">This is your very <em class="md-inline-italic">first</em> note. </h2><p class="md-block-unstyled">I just wanted to point out some features. </p><ul class="md-block-unordered-list-item"><li>- + space creates a bullet point. </li></ul><ol class="md-block-ordered-list-item"><li> 1 + space creates a numbered list. </li></ol><p class="md-block-unstyled">And if you select the word &quot;Willkommen,&quot; you&#x27;ll see your new inline toolbar where</p><p class="md-block-unstyled">you can apply <span class="md-inline-highlight">highlights,</span> add a <a class="md-inline-link" href="http://www.dulynotes.com" target="_blank" rel="noopener noreferrer">link</a>, or even</p><blockquote class="md-block-blockquote">create a blockquote.</blockquote>',
                author_id: sub
            }


            if (!response[0]) {
                dbInstance.create_user([sub, name, email]).then(() => {

                    dbInstance.insertfirstnote([firstNote.title, firstNote.content, firstNote.author_id])

                })
            }

        })

        //Grab Stripe ID using Google Sub

        dbInstance.get_stripe(sub).then(customer => {

            if (customer[0].customer_id) {

                const { customer_id } = customer[0]
                stripe.customers.retrieve(customer_id).then(customer => {

                    const { total_count } = customer.subscriptions

                    if (total_count === 1) {
                        res.status(200).send('active')
                    }
                    else {
                        res.status(200).send('notactive')
                    }
                })
            }
            else {
                res.status(200).send('noaccount')
            }
        })
    }

})

app.get('/api/customerid', (req, res) => {
    //get the Customer ID from DB
    const { sub } = req.session.user

    const dbInstance = req.app.get('db');

    dbInstance.get_stripe(sub).then(customer => {

        const { customer_id } = customer[0]

        //retrieve a Customer
        stripe.customers.retrieve(customer_id).then(stripecust => {

            res.status(200).send({ stripecust: stripecust, name: req.session.user })
        })
    })


    app.post('/api/customersub', (req, res) => {
        const { id, default_source } = req.body.customer

        // retrieve a Customer's card

        stripe.customers.retrieveCard(
            id,
            default_source,
        ).then(card => {
            const { brand, last4 } = card
            res.status(200).send({ brand: brand, last4: last4 })
        })
    }),

        app.put('/api/renewsubscription', (req, res, next) => {
            const { customer } = req.body;
            const { id } = customer.stripecust.subscriptions.data[0]

            stripe.subscriptions.retrieve(id).then(response => {

                stripe.subscriptions.update(id, {
                    cancel_at_period_end: false,
                    items: [{
                        id: response.items.data[0].id,
                        plan: process.env.PLAN_ID,
                    }]
                }).then(customer => {
                    res.status(200).send(customer)
                })
            })
        })
})





//--------STRIPE-------------//


//---------SENDGRID--------//

app.post('/api/sendemail', (req, res) => {

    const msg = {
        to: 'brockhoffrw@gmail.com',
        from: req.body.email,
        subject: `Message from ${req.body.name}`,
        text: req.body.message
    };

    sgMail.send(msg);
    res.sendStatus(200)

})



//--------------------------//

const SERVER_PORT = process.env.SERVER_PORT || 3040;
app.listen(SERVER_PORT, () => {
    console.log(`Server listening: ${SERVER_PORT}`)
})