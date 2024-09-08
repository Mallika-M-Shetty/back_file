const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateServiceInput(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  // data.email = !isEmpty(data.email) ? data.email : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title filed is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
