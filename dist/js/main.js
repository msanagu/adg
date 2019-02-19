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

// Adds green background and border when selected
const toggleOption = option => {
  // Set initial state of option
  let isSelected = false;

  if (!isSelected) {
    option.classList.toggle("selected");
  }

  // Set option state
  isSelected = !isSelected;
  extractPrice(option);
};

// TODO: Fix null error when clicking anything within option div that is an image

// TODO: Re-calculate total when product is "deslected"

const logCart = (products, total) => {
  console.log("Products:", products);
  console.log("Total:", total);
};

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

    // Save all praducts as JSON object
    cartItems = Object.assign({ products });

    // Add Shipping
    let withShipping = cartSum + shipping;
    console.log(withShipping);

    // Save the total price as JSON
    total = Object.assign({ withShipping });

    logCart(cartItems, cartSum);
  } else {
    sessionStorage.removeItem(name);
  }
};

// ----------------------------------------------------------
// EVENT HANDLERS

// Toggles style change, extracts price, adds product to cart
const handleOptionClick = event => {
  event = event || window.event;
  let selectedOption = event.target || event.srcElement;
  toggleOption(selectedOption);
};

// ----------------------------------------------------------
// PAYMENT FORM

let shippingInfo = {};

const toggleFormClass = event => {
  let inputField = event.target || event.srcElement;
  console.log("Typing...");
  inputField.classList.add("filled");
  let label = inputField.previousElementSibling;
  console.log(label.innerHTML);
  label.classList.add("filled");
  label.style.display = label.style.display === "none" ? "none" : "";
};

// Handles form input
const handleFormInput = event => {
  event = event || window.event;
  let inputValue = event.target.value || event.srcElement;
  console.log(inputValue);
  shippingInfo[event.target.name] = inputValue;
  console.log(shippingInfo);
};

const handleSubmit = event => {
  // sumbits form data to JSON
};
