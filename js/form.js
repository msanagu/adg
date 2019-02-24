// ----------------------------------------------------------
// PAYMENT FORM

const paymentForm = document.getElementById("payment-form");
const lowerForm = document.getElementById("hidden-form");
const cartSummary = document.querySelectorAll(".cart-summary");
let orderOBJ = {
  cart: {
    products: "",
    total: {
      sub_total: "",
      shipping: "$8.20",
      grand_total: ""
    }
  }
};
let shippingOBJ = {};
let validFields = [];
let submitCount = 0;

// If user clicks or tabs into input field, toggle active class
const toggleActive = event => {
  let inputField = event.target || event.srcElement;
  let label = inputField.previousElementSibling;
  label.classList.add("active");
  label.style.display = label.style.display === "none" ? "none" : "";
};

// Handles form input, validates each field, and updates shippingOBJ
const handleFormInput = event => {
  event = event || window.event;
  let inputField = event.target || event.srcElement;
  let inputValue = event.target.value || event.srcElement;
  let inputName = event.target.name;

  // Change from red/green & show check based on bootstrap validation
  if (inputField.classList.contains("is-invalid")) {
    // Change label color
    inputField.previousElementSibling.classList.add("is-invalid");
    validFields.pop("valid");
  } else {
    inputField.classList.add("active");
    // Change label color
    inputField.previousElementSibling.classList.remove("is-invalid");
    // Show Check
    inputField.nextElementSibling.style.display = "block";
    validFields.push("valid");
  }

  // Take input value and place it into data object that will later stringify to JSON
  shippingOBJ[inputName] = inputValue;
};

const handleSubmit = event => {
  event.preventDefault();

  // Loops through sessionStorage to get selected product data
  const products = { ...sessionStorage };
  const cartNames = Object.keys(products);
  const cartPrices = Object.values(products);
  const shipping = 8.2;
  let cartNums = [];
  let cartSum = [];

  // If sessionStorage is not empty, iterate through items
  if (cartNames && cartNames.length) {
    cartNums = cartPrices.map(el => parseFloat(el));
    console.log(cartNums);
    cartSum = cartNums.reduce((sum, amount) => sum + amount);
    console.log(cartSum);
  }

  // Add Shipping
  let withShipping = cartSum + shipping;

  // Form is ready for submitting if all form fields are valid
  // TODO: Fix - invalid field being overlooked because there are 2 optional fields

  validateFormFields = fields => {
    // Form is ready for submitting if cart is not empty
    const valid = fields && fields.length >= 8;
    if (!valid) {
      alert("Please complete form.");
    }
    return valid;
  };

  validateCart = cart => {
    // Form is ready for submitting if cart is not empty
    const valid = cart && cart.length !== 0;
    if (!valid) {
      alert("Your cart is empty.");
    }
    return valid;
  };

  // If form is valid ------------
  if (validateFormFields(validFields)) {
    orderOBJ.cart["products"] = products;
    orderOBJ.cart.total["sub_total"] = `$${cartSum}`;
    orderOBJ.cart.total["grand_total"] = `$${withShipping}`;
    const cart = Object.assign({}, orderOBJ);
    const orderJSON = JSON.stringify(cart);
    // const finalShippingJSON = JSON.stringify(shippingOBJ);

    // If form is valid and cart is not empty
    if (validateFormFields(validFields) && validateCart(cartPrices)) {
      // Takes bold style off of cart info after completing form
      cartSummary.forEach(price => {
        price.lastElementChild.style.fontWeight = "400";
      });

      // Reveal shipping and total cost
      document.getElementById("shipping-amount").innerHTML = "$8.20 CAD";
      document.getElementById("sub-total").innerHTML = "Total";
      document.getElementById("total-amount").innerHTML = `$${withShipping}`;

      // Reveals lower portion of form
      lowerForm.style.display = "block";

      // Changes submit button copy
      document.getElementById("form-submit").innerHTML = "PLACE ORDER";

      // Increment how many times submit has been clicked
      submitCount++;
    }

    if (submitCount > 1) {
      console.log(orderJSON);
      console.log(JSON.stringify(shippingOBJ));
      alert(
        `Thank you for your order! Here is your order information: ${orderJSON} Expect standard shipping to arrive in 5-7 business days. ${JSON.stringify(
          shippingOBJ
        )}`
      );
    }
  }
};
