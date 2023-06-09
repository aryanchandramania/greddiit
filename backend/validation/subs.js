const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSubInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };    
};