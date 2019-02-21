// ----------------------------------------------------------
// PAYMENT FORM

const paymentForm = document.getElementById("payment-form");
const lowerForm = document.getElementById("hidden-form");
let shippingOBJ = {};
let validFields = [];
let formIsValid = false;
let cartHasItems = false;

const showHidden = () => {
  // Shows hidden part of form
  lowerForm.style.display = "block";
};

const toggleActive = event => {
  let inputField = event.target || event.srcElement;

  // If user is currently typing in field, toggle active class
  inputField.classList.add("active");
  let label = inputField.previousElementSibling;
  label.classList.add("active");
  label.style.display = label.style.display === "none" ? "none" : "";
};

// Handles form input, validates each field, and updates shippingOBJ
const handleFormInput = event => {
  event = event || window.event;
  let inputValue = event.target.value || event.srcElement;
  let inputName = event.target.name;

  // Change from red/green & show check based on bootstrap validation
  if (event.target.classList.contains("is-invalid")) {
    // Change label color
    event.target.previousElementSibling.classList.add("is-invalid");
    // Keep check hidden
    event.target.nextElementSibling.style.display = "none";
    validFields.pop("valid");
    console.log(validFields);
  } else {
    // Change label color
    event.target.previousElementSibling.classList.remove("is-invalid");
    // Show Check
    event.target.nextElementSibling.style.display = "block";
    // Iterate valid field count
    validFields.push("valid");
    console.log(validFields);
  }

  // Take input value and place it into data object that will later stringify to JSON
  shippingOBJ[inputName] = inputValue;
};

const handleSubmit = event => {
  event.preventDefault();

  // Loops through sessionStorage to get selected product data
  const cartNames = Object.keys(sessionStorage);
  const cartPrices = Object.values(sessionStorage);
  const products = Object.assign({});
  const shipping = 10.25;
  let cartNums = [];
  let cartSum = [];

  // If sessionStorage is not empty, iterate through items
  if (Object.keys(sessionStorage).length) {
    cartNums = cartPrices.map(el => parseFloat(el));
    cartSum = cartNums.reduce((sum, amount) => sum + amount);
  }

  // For every product, associate it with its corresponding price
  cartNames.forEach(name => {
    cartPrices.forEach(price => {
      products[name] = price;
    });
  });

  // Add Shipping
  let withShipping = cartSum + shipping;

  // Save the total price as JSON
  total = Object.assign({ withShipping });

  // Form is ready for submitting if all form fields are valid
  // TODO: Fix - invalid field being overlooked because there are 2 optional fields
  if (validFields.length >= 8) {
    formIsValid = true;
  } else {
    alert("Please complete form.");
  }
  console.log("Form is valid:", formIsValid);

  // Form is ready for submitting if cart is not empty
  if (cartPrices.length == 0) {
    alert("Your cart is empty.");
  } else {
    cartHasItems = true;
    console.log("Cart has items:", cartHasItems);
    document.getElementById("form-submit").innerHTML = "PLACE ORDER";
    showHidden();
  }

  // If form is valid ------------
  // Log the cart JSON
  if (formIsValid) {
    orderOBJ.cart["products"] = products;
    orderOBJ.cart.total["sub_total"] = `$${cartSum}`;
    orderOBJ.cart.total["grand_total"] = `$${withShipping}`;
    const cart = Object.assign({}, orderOBJ);
    const orderJSON = JSON.stringify(cart);
    const finalShippingJSON = JSON.stringify(shippingOBJ);

    // If form is valid and cart is not empty, log and alert the JSON
    if (formIsValid && cartHasItems) {
      console.log(orderJSON);
      alert(`Order Information:" ${orderJSON}`);

      console.log(finalShippingJSON);
      alert(`Shipping Information: ${finalShippingJSON}`);
    }
  }
};
