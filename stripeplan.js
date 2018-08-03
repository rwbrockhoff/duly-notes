
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