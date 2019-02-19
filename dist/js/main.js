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
// ORDER OPTIONS

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

const extractPrice = option => {
  // Find the h4 element that contains the price
  // Extract dollar amount from element and return as string
  const priceString = option.querySelector(".price");
  let price = priceString.innerHTML
    .toString()
    .split(" ")
    .filter(function(el) {
      return el.startsWith("$");
    })[0];

  const optionName = option.querySelector(".name");
  let name = optionName.innerHTML.toString();

  // If option is selected, add its price to the cart
  if (option.classList.contains("selected")) {
    console.log(price);
    sessionStorage.setItem(name, price);
  } else {
    sessionStorage.removeItem(name);
  }
};

// ----------------------------------------------------------
// PAYMENT FORM

const toggleFormClass = input => {
  console.log("Typing...");
  input.classList.add("filled");
  let label = input.previousElementSibling;
  console.log(label.innerHTML);
  label.classList.add("filled");
  label.style.display = label.style.display === "none" ? "none" : "";
};

// ----------------------------------------------------------
// EVENT HANDLERS

// Toggles style change, extracts price, adds product to cart
const handleOptionClick = event => {
  event = event || window.event;
  let selectedOption = event.target || event.srcElement;
  toggleOption(selectedOption);
};

// Handles form input
const handleFormInput = event => {
  event = event || window.event;
  let inputField = event.target || event.srcElement;

  toggleFormClass(inputField);
};
