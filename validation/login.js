const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTokenInput(data) {
  let errors = {};

  data.clientID = !isEmpty(data.client_id) ? data.client_id : "";
  data.clientSecret = !isEmpty(data.client_secret) ? data.client_id : "";
  data.grantType = !isEmpty(data.grant_type) ? data.grant_type : "";



  if (Validator.isEmpty(data.clientID)) {
    errors.clientID = "clientID is invalid";
  }
  if (Validator.isEmpty(data.clientSecret)) {
    errors.clientSecret = "clientSecret filed is required";
  }

  if (Validator.isEmpty(data.grantType)) {
    errors.grantType = "Grant Type filed is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};



module.exports = function validateInvoiceInput(data) {
  let errors = {};

  data.invoice_number = !isEmpty(data.invoice_number) ? data.invoice_number : "";

  if (Validator.isEmpty(data.clientID)) {
    errors.clientID = "invoice_number is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
