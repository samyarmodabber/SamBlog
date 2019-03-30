const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.sex = !isEmpty(data.sex) ? data.sex : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

   if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }else if (!Validator.isLength(data.username, { min: 5, max: 25 })) {
    errors.username = 'Username must be between 2 and 30 characters';
  }
   if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First Name field is required';
  }else if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = 'first Name must be between 2 and 30 characters';
  }

 

   if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last Name field is required';
  }else if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = 'Last Name must be between 2 and 30 characters';
  }
 

  if (Validator.isEmpty(data.sex)) {
    errors.sex = 'Sex field is required';
  }else if (!Validator.isIn(data.sex,['m','f','n'])) {
    errors.sex = 'Sex is invalid ';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }else if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
