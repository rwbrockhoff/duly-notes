
var stripe = require("stripe")("sk_test_j3TyYwnk8fC4YEUeBcLh2dBl");

stripe.customers.createSource(
  "cus_DLQpVKkNerUJbt",
  { source: "src_1CujxeLKuJEOZqWvbRnHlFjN" },
  function(err, source) {
    // asynchronously called
  }
);

var stripe = require("stripe")("sk_test_j3TyYwnk8fC4YEUeBcLh2dBl");

stripe.customers.createSource(
  "cus_DLYFpcSbtvOk5i",
  { source: "tok_mastercard" },
  function(err, card) {
    // asynchronously called
  }
);

joesource: tok_1CuwHDLKuJEOZqWvTVMxSucP



stripe.customers.update('cus_V9T7vofUbZMqpv', {
    source: 'tok_visa',
  });


//final step, update customer with source

var stripe = require("stripe")("sk_test_iYH88H9dnmQ9puuo2f4EKm00");

stripe.customers.update("cus_AFGbOSiITuJVDs", {
  default_source: "src_18eYalAHEMiOZZp1l9ZTjSU0"
});


//-----coding steps-------//

// Check DB for existing customer_id. 

//   If ID exists > Pop Up: You Already Have a Subscription

//   Else > Go through the steps like norm. 

var firstNote = {
  title: 'Your First Note',
  content: '	<h1 class="md-block-header-one">Willkommen! </h1><h2 class="md-block-header-two">This is your very <em class="md-inline-italic">first</em> note. </h2><p class="md-block-unstyled">I just wanted to point out some features. </p><ul class="md-block-unordered-list-item"><li>- + space creates a bullet point. </li></ul><ol class="md-block-ordered-list-item"><li> 1 + space creates a numbered list. </li></ol><p class="md-block-unstyled">And if you select the word &quot;Willkommen,&quot; you&#x27;ll see your new inline toolbar where</p><p class="md-block-unstyled">you can apply <span class="md-inline-highlight">highlights,</span> add a <a class="md-inline-link" href="http://www.dulynotes.com" target="_blank" rel="noopener noreferrer">link</a>, or even</p><blockquote class="md-block-blockquote">create a blockquote.</blockquote><p class="md-block-unstyled">Hitting the control key will toggle your notes sidebar on and off screen. </p><p class="md-block-unstyled">Hitting the up and down arrows will toggle your pomodoro on and off screen. </p><p class="md-block-unstyled"><br/></p>',
  author_id: sub
}

if (!response[0]){
  dbInstance.create_user([sub, name, email])

  dbInstance.insertfirstnote([firstNote.title, firstNote.content, firstNote.author_id])

   }