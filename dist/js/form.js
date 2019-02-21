// ----------------------------------------------------------
// PAYMENT FORM

const paymentForm = document.getElementById("payment-form");
let shippingOBJ = {};

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

  // Take input value and place it into data object that will later stringify to JSON
  shippingOBJ[inputName] = inputValue;
};

const handleSubmit = event => {
  event.preventDefault();

  // Loops through sessionStorage to get selected product data
  const cartNames = Object.keys(sessionStorage);
  const cartPrices = Object.values(sessionStorage);
  const cartNums = cartPrices.map(el => parseFloat(el));
  const cartSum = cartNums.reduce((sum, amount) => sum + amount);
  const products = Object.assign({});
  const shipping = 10.25;

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

  // Logs the cart JSON
  orderOBJ.cart["products"] = products;
  orderOBJ.cart.total["sub_total"] = `$${cartSum}`;
  orderOBJ.cart.total["grand_total"] = `$${withShipping}`;
  const cart = Object.assign({}, orderOBJ);
  const orderJSON = JSON.stringify(cart);
  console.log(orderJSON);

  // Logs the shipping JSON
  const finalShippingJSON = JSON.stringify(shippingOBJ);
  console.log(finalShippingJSON);
};
