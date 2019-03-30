const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.body = !isEmpty(data.body) ? data.body : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title of post is required';
  }else if (!Validator.isLength(data.title, { min: 10, max: 300 })) {
    errors.title = 'Title must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = 'Body of post is required';
  }else if (!Validator.isLength(data.body, { min: 10, max: 300 })) {
    errors.body = 'Body must be between 10 and 300 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
