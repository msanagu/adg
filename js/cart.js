// ----------------------------------------------------------
// ORDER OPTIONS & CART

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
