const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTeamInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.title = !isEmpty(data.title) ? data.title : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name filed is required";
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title filed is required";
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "not a valid url for facebook";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "not a valid url for twitter";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "not a valid url for linkedin";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
