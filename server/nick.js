const express = require('express')
    , bodyParser = require('body-parser')
    , stripe = require('stripe')(process.env.STRIPE_KEY);
require('dotenv').config();
const app = express();

const headers = {
  api_key: process.env.STRIPE_KEY,
};

// update installments_paid
const incrementPaymentsCount = event => {
  console.log('incrementing count')
  let sub = event.data.object.lines.data[0];
  const sub_id = sub.subscription;
  if (sub.metadata.installments_paid) {
    count = parseInt(sub.metadata.installments_paid);
    count++;
    console.log('updating sub')
    stripe.subscriptions.update(sub_id, { metadata: { installments_paid: 999 } }, headers);
    // need to cancel their subs!!!!!
    // if (count > 12) {
    //   stripe.subscriptions.del(sub_id, headers);
    // }
  }
};

// middleware
app.use(bodyParser.raw({ type: '*/*' }));

// creates a new subscription, connecting a user to a product
app.get('/subscription', (req, res) => {
  const options = {
    customer: process.env.CUSTOMER_ID,
    items: [{ plan: process.env.PLAN_ID }],
    metadata: {
      installments_paid: 0
    }
  };
  const sub = stripe.subscriptions.create(options, headers, err => console.error(err));
  res.status(200).send({ received: true });
});

// listens for invoice.payment_succeeded event
// and updates customer's installments count
app.post(`/webhook`, (req, res) => {
  console.log('webhook has been hit')
  const signature = req.headers['stripe-signature'];
  try {
    let event = stripe.webhooks.constructEvent(req.body, signature, process.env.WEBHOOK_SECRET);
    if (event.type === `invoice.payment_succeeded`) {
      console.log('start increment function');
      incrementPaymentsCount(event);
    } else {
      return res.status(400).send(`Wrong event...`);
    }
  } catch(err) {
    return res.status(400).send('Error with Stripe signature');
  }
  return res.status(200).json({ received: true });

});

const SERVER_PORT = 3095;
app.listen(SERVER_PORT, () => console.log(`Listening on... ${SERVER_PORT}`))