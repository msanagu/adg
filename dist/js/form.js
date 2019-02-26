// ----------------------------------------------------------
// PAYMENT FORM

const paymentForm = document.getElementById("payment-form");
const lowerForm = document.getElementById("hidden-form");
const cartSummary = document.querySelectorAll(".cart-summary");
const orderOBJ = {
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
  const inputField = event.target || event.srcElement;
  const label = inputField.previousElementSibling;
  label.classList.add("active");
  label.style.display = label.style.display === "none" ? "none" : "";
};

// Handles form input, validates each field, and updates shippingOBJ
const handleFormInput = event => {
  event = event || window.event;
  const inputField = event.target || event.srcElement;
  const inputValue = event.target.value || event.srcElement;
  const inputName = event.target.name;

  // Change from red/green & show check based on bootstrap validation
  if (inputField.classList.contains("is-invalid")) {
    // Change label color
    inputField.previousElementSibling.classList.add("is-invalid");
    validFields.pop();
  } else {
    inputField.previousElementSibling.classList.remove("is-invalid");
    inputField.classList.add("active");
    // Show Check
    inputField.nextElementSibling.style.display = "block";
    validFields.push("valid");
  }

  // Take input value and place it into data object that will later stringify to JSON
  shippingOBJ[inputName] = inputValue;
};

const validateFormFields = fields => {
  // Form is ready for submitting if cart is not empty
  const valid = fields && fields.length >= 8;
  if (!valid) {
    alert("Please complete form.");
  }
  return valid;
};

const validateCart = cart => {
  // Form is ready for submitting if cart is not empty
  const valid = cart && cart.length !== 0;
  if (!valid) {
    alert("Your cart is empty.");
  }
  return valid;
};

const handleSubmit = event => {
  event.preventDefault();

  // Loops through sessionStorage to get selected product data
  const products = { ...sessionStorage };
  const cartNames = Object.keys(products);
  const cartPrices = Object.values(products);

  // If form fields are valid and cart is not empty
  if (validateFormFields(validFields) && validateCart(cartPrices)) {
    const shipping = 8.2;

    let cartSum = 0.0;
    if (cartNames && cartNames.length) {
      cartSum = cartPrices
        .map(el => parseFloat(el))
        .reduce((sum, amount) => sum + amount);
    }

    // Calculate cartSum and totalDue
    const totalDue = cartSum + shipping;
    orderOBJ.cart["products"] = products;
    orderOBJ.cart.total["sub_total"] = `$${cartSum.toFixed(2)}`;
    orderOBJ.cart.total["grand_total"] = `$${totalDue.toFixed(2)}`;
    const cart = Object.assign({}, orderOBJ);
    const orderJSON = JSON.stringify(cart);

    // Takes bold style off of cart info after completing form
    cartSummary.forEach(price => {
      price.lastElementChild.style.fontWeight = "400";
    });

    // Reveal shipping and total cost
    document.getElementById("shipping-amount").innerHTML = "$8.20 CAD";
    document.getElementById("sub-total").innerHTML = "Total";
    document.getElementById("total-amount").innerHTML = `$${totalDue.toFixed(
      2
    )}`;

    // Reveals lower portion of form
    lowerForm.style.display = "block";

    // Changes submit button copy
    document.getElementById("form-submit").innerHTML = "PLACE ORDER";

    // Increment how many times submit has been clicked
    submitCount++;

    if (submitCount > 1) {
      alert(
        `Thank you for your order! Here is your order information: ${orderJSON} Expect standard shipping to arrive in 5-7 business days. ${JSON.stringify(
          shippingOBJ
        )}`
      );
    }
  }
};
