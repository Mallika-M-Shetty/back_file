const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name Must Be 2 and 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name filed is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email filed is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password filed is required";
  }
  if (!Validator.isLength(data.password, { min: 2, max: 10 })) {
    errors.password = "Password Must Be 2 and 10 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password filed is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password Must Match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
