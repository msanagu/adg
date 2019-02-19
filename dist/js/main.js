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

const populateCart = () => {
  const cartNames = Object.keys(sessionStorage);
  const cartPrices = Object.values(sessionStorage);

  // const preShippingTotal = cartPrices
  console.log(cartNames);
  console.log(cartPrices);

  const getTotal = (sum, price) => {
    if (typeof price == "number") {
      sum + price;
    }
  };

  const total = cartPrices.reduce(getTotal);
  console.log(total);

  // add cart item name and price to cart

  // <div id="cart-item-1">
  //   <div class="item-img-border">
  //     <img
  //       class="item-img"
  //       src="./img/checkout/single-set.png"
  //       alt="Shopping Cart Item"
  //     />
  //   </div>
  //   <div class="item-name">
  //     <p>C&C - Lorem Ipsum</p>
  //   </div>
  //   <p class="item-price">$54.77 CAD</p>
  // </div>;
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
  } else {
    sessionStorage.removeItem(name);
  }

  populateCart();
};

const calculateTotal = () => {
  // put all selected products into an array
  // get all products in sessionStorage and add them
  // add shipping to get total
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
