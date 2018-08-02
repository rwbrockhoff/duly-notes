const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const axios = require('axios');
let sessionId = 45;
require('dotenv').config();
const controller = require('./controller');

const stripeController = require('./stripeController');
const stripe = require('stripe')(process.env.STRIPE_KEY)

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: '*/*' }));

massive(process.env.CONNECTION_STRING).then( db => {
    app.set('db', db)
}).catch( error => {
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

app.delete('/api/note/:id', controller.deleteNote)

app.post('/api/note', controller.createnote)


//-------------------//

app.get('/auth/callback', async (req, res) => {

    const payload = {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    };
//----get token---//

    let receiveToken = await axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)

//----exchange token---//

let receiveUser = await axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${receiveToken.data.access_token}`)

//-----user data-----//
req.session.user = receiveUser.data;
req.session.user.id = sessionId;
sessionId++
res.redirect('/#/texteditor')


})

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/#/');
    res.sendStatus(200);
})

app.get('/api/user-data', (req, res) => {
    res.json({user: req.session.user});
})

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.send();
})

//---------STRIPE----------//
const headers = {
    api_key: process.env.STRIPE_KEY,
  };

//create customer on register 

app.post('/api/createcustomer', (req, res) => {
    
    const {email, name, sub} = req.session.user
    
    const customer = stripe.customers.create({
        description: name, 
        email: email
       
    })
    .then( (res) => {
    const dbInstance = req.app.get('db')
   
    dbInstance.add_stripe_cust_id([res.id, sub])
    
    .then( user => {
        console.log(user)
        res.status(200).send(user);
    }).catch(error => console.log)
     
})})










//--------STRIPE-------------//



const SERVER_PORT = process.env.SERVER_PORT || 3040;
app.listen(SERVER_PORT, () => {
    console.log(`Server listening: ${SERVER_PORT}`)
})