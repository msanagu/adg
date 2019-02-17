// ----------------------------------------------------------
// IMAGE CAROUSEL

const thumbnail = document.querySelector(".img-thumbnail");
const productOptions = document.getElementById("product-options");
const options = document.querySelectorAll(".option");

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

// Adds green background, box-shadow, and border when selected
const toggleOption = option => {
  // Set initial state of option
  let isSelected = false;

  if (!isSelected) {
    option.classList.toggle("selected");
  }

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

// Toggles style change, extracts price, adds product to cart
const handleOptionClick = event => {
  event = event || window.event;
  let selectedOption = event.target || event.srcElement;

  toggleOption(selectedOption);
};
