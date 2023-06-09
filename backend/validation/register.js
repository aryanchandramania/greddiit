const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.first = !isEmpty(data.first) ? data.first : "";
  data.last = !isEmpty(data.last) ? data.last : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.name = "Username is required";
  }// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }if (!Validator.isEmpty(data.password) && !Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must have 6-30 characters";
  }return {
    errors,
    isValid: isEmpty(errors)
  };
};