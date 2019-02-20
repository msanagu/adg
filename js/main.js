// ----------------------------------------------------------
// IMAGE CAROUSEL

const changeImage = event => {
  // Compatibility with Internet Explorer 8 and earlier
  event = event || window.event;
  let targetElement = event.target || event.srcElement;

  // Change the main image src to the target element's src
  let mainImage = document.getElementById("main-image");

  // Only change the image if the click happens on image and not any other part of the div element
  if (targetElement.tagName == "IMG") {
    mainImage.src = targetElement.getAttribute("src");
  }
};

// ----------------------------------------------------------
// ORDER OPTIONS & CART

let orderOBJ = {
  cart: {
    products: "",
    total: {
      sub_total: "",
      shipping: "$10.25",
      grand_total: ""
    }
  }
};

// Adds green background and border when selected
const toggleOption = option => {
  // Set initial state of option
  let isSelected = false;

  if (!isSelected) {
    option.parentNode.classList.toggle("selected");
  }

  // Set option state
  isSelected = !isSelected;
  extractPrice(option.parentNode);
};

// TODO: Re-calculate total when product is "deslected"

const extractPrice = option => {
  // Find the h4 element that contains the price
  const priceString = option.querySelector(".price");
  const price = priceString.innerHTML
    .toString()
    .split(" ")
    .filter(el => {
      return el.startsWith("$");
    })[0];

  // Extract dollar amount from element and return as string
  const priceNum = parseFloat(price.match(/\d+\.\d+/g));
  const optionName = option.querySelector(".name");
  const name = optionName.innerHTML.toString();

  // If option is selected, add its price to the sessionStorage
  if (option.classList.contains("selected")) {
    sessionStorage.setItem(name, priceNum);
    option.querySelector(".cta").innerHTML = "Remove From Cart";
  } else {
    sessionStorage.removeItem(name);
    option.querySelector(".cta").innerHTML = "Add To Cart";
  }
};

// ----------------------------------------------------------
// OPTION EVENT HANDLER

// Toggles style change, extracts price, adds product to cart
const handleOptionClick = event => {
  event = event || window.event;
  let selectedOption = event.target || event.srcElement;
  toggleOption(selectedOption);
};

// ----------------------------------------------------------
// PAYMENT FORM

const paymentForm = document.getElementById("payment-form");
const formFields = paymentForm.elements;

const toggleActive = event => {
  let inputField = event.target || event.srcElement;

  // If user is currently typing in field, toggle active class
  inputField.classList.add("active");
  let label = inputField.previousElementSibling;
  label.classList.add("active");
  label.style.display = label.style.display === "none" ? "none" : "";
};

// Handles form input, validates each field, and updates shippingOBJ
let shippingOBJ = {};

const handleFormInput = event => {
  event = event || window.event;
  let inputValue = event.target.value || event.srcElement;
  let inputName = event.target.name;

  // Take input value and place it into data object that will later stringify to JSON
  shippingOBJ[inputName] = inputValue;

  // VALIDATIONS

  // Email (must contain "@" and ".")
  if (!paymentForm.email.value.includes("@")) {
    // paymentForm.email.classList.remove("valid");
    paymentForm.email.classList.add("invalid");
    alert("Please enter a valid email.");
    return false;
  } else {
    paymentForm.email.classList.add("valid");
  }

  if (!paymentForm.email.value.includes(".")) {
    // paymentForm.email.classList.remove("valid");
    paymentForm.email.classList.add("invalid");
    alert("Please enter a valid email.");
    return false;
  } else {
    paymentForm.email.classList.add("valid");
  }

  // First Name (Must contain at least one letter)

  // console.log(paymentForm.first_name.value.length);
  // if (!paymentForm.first_name.value.length > 0) {
  //   // paymentForm.email.classList.remove("valid");
  //   paymentForm.first_name.classList.add("invalid");
  //   alert("Please enter a name.");
  //   return false;
  // } else {
  //   paymentForm.first_name.classList.add("valid");
  // }
};

const handleSubmit = event => {
  event.preventDefault();

  // var elements = document.getElementById("my-form").elements;

  // for (var i = 0, element; (element = elements[i++]); ) {
  //   if (element.type === "text" && element.value === "")
  //     console.log("it's an empty textfield");
  // }

  // Form Validation

  const totalFields = formFields.length;

  for (let i = 0; i < totalFields; i++) {
    if (formFields[i].type === "text" && formFields[i].value === "") {
      alert("Please fill out all required fields");
      formFields[i].classList.remove("valid");
      formFields[i].classList.add("invalid");
      return false;
    }
  }

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

  // logCart(products, cartSum, withShipping);
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
