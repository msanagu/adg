// ----------------------------------------------------------
// PAYMENT FORM

const paymentForm = document.getElementById("payment-form");
const lowerForm = document.getElementById("hidden-form");
const cartSummary = document.querySelectorAll(".cart-summary");
let shippingOBJ = {};
let validFields = [];
let formIsValid = false;
let cartHasItems = false;
let submitCount = 0;

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
    // console.log(validFields);
  } else {
    // Change label color
    event.target.previousElementSibling.classList.remove("is-invalid");
    // Show Check
    event.target.nextElementSibling.style.display = "block";
    // Iterate valid field count
    validFields.push("valid");
    // console.log(validFields);
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
  const shipping = 8.2;
  let cartNums = [];
  let cartSum = [];

  // If sessionStorage is not empty, iterate through items
  if (Object.keys(sessionStorage).length) {
    cartNums = cartPrices.map(el => parseFloat(el));
    console.log(cartNums);
    cartSum = cartNums.reduce((sum, amount) => sum + amount);
    console.log(cartSum);
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
  }

  // If form is valid ------------
  if (formIsValid) {
    orderOBJ.cart["products"] = products;
    orderOBJ.cart.total["sub_total"] = `$${cartSum}`;
    orderOBJ.cart.total["grand_total"] = `$${withShipping}`;
    const cart = Object.assign({}, orderOBJ);
    const orderJSON = JSON.stringify(cart);
    const finalShippingJSON = JSON.stringify(shippingOBJ);

    // If form is valid and cart is not empty
    if (formIsValid && cartHasItems) {
      // Takes bold style off of cart info after completing form
      cartSummary.forEach(price => {
        price.lastElementChild.style.fontWeight = "400";
      });

      // Reveal shipping and total cost
      document.getElementById("shipping-amount").innerHTML = "$8.20 CAD";
      document.getElementById("total-amount").innerHTML = `$${withShipping}`;

      // Reveals lower portion of form
      revealHidden = true;
      showHidden();

      // Changes submit button copy
      document.getElementById("form-submit").innerHTML = "PLACE ORDER";
      submitCount++;
    }

    if (submitCount > 1) {
      console.log(orderJSON);
      alert(
        `Thank you for your order! Here is your order information: ${orderJSON}`
      );

      console.log(finalShippingJSON);
      alert(
        `Expect standard shipping to arrive in 5-7 business days. ${finalShippingJSON}`
      );
    }
  }
};
