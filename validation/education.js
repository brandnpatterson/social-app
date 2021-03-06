const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateEducationInput = data => {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';

  // School
  if (Validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }
  if (!Validator.isLength(data.school, { min: 1, max: 30 })) {
    errors.school = 'Text field must be less than 30 characters';
  }

  // Degree
  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }
  if (!Validator.isLength(data.degree, { min: 1, max: 30 })) {
    errors.degree = 'Text field must be less than 30 characters';
  }

  // From
  if (Validator.isEmpty(data.from)) {
    errors.from = 'Date from field is required';
  }

  // Field of study
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
