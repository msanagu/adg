// Bootstrap Validation

// Email

bootstrapValidate(
  "#email",
  "email:Enter a valid email address.|required:This field is required."
);

// First name, last name, address1, and city fields are required
bootstrapValidate(
  ["#firstName", "#lastName", "#address1", "#city"],
  "required:This field is required."
);

// Province can only have letters and is required
bootstrapValidate(
  "#province",
  "alpha:You can only put alphabetical characters.|required:This field is required."
);

// Zipcode must have 5 numbers
bootstrapValidate(
  "#zipCode",
  "numeric:You can only put alphanumeric characters.|min:5:Please enter a 5 digit zipcode ######|max:5:Please enter a 5 digit zipcode ######|required:This field is required."
);

// Phone fields can only have numbers
bootstrapValidate(
  "#phone",
  "numeric:You can only put alphanumeric characters.|min:10:Please enter 10 digits ##########|max:10:Please enter 10 digits ##########"
);
