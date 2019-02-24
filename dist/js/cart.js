// ----------------------------------------------------------
// ORDER OPTIONS & CART

let markupArr = [];
let finalMarkup = "";

// Adds green background and border when selected
const toggleOption = option => {
  option.parentNode.classList.toggle("selected");
  extractProductData(option.parentNode);
};

const extractProductData = option => {
  // Find the h4 element that contains the price
  const priceString = option.querySelector(".price");
  const price = priceString.innerHTML
    .toString()
    .split(" ")
    .filter(el => el.startsWith("$"))[0];

  // Extract dollar amount from element and return as string
  const priceNum = parseFloat(price.match(/\d+\.\d+/g));
  const optionName = option.querySelector(".name");
  const name = optionName.innerHTML.toString();

  // If option is selected, add its price to the sessionStorage
  if (option.classList.contains("selected")) {
    const productImg = option.querySelector(".product-image");
    const imagePath = productImg.getAttribute("src");
    const markup = `<div class="cart-item">
        <div class="item-img-border">
          <img
            class="item-img"
            src="${imagePath}"
            alt="Shopping Cart Item"
          />
        </div>
        <div class="item-name">
          <p>
            ${name}
          </p>
        </div>
        <p class="item-price">${price}</p>
      </div>
      <hr />`;

    markupArr.push(markup);
    sessionStorage.setItem(name, priceNum);
    option.querySelector(".cta").innerHTML = "Remove From Cart";
  } else {
    markupArr.pop();
    sessionStorage.removeItem(name);
    option.querySelector(".cta").innerHTML = "Add To Cart";
  }
  const cartPrices = Object.values(sessionStorage);
  const cartNums = cartPrices.map(el => parseFloat(el));
  const cartSum = cartNums.reduce((sum, amount) => sum + amount);

  // Populate cart-item div with final markup
  const cartWrapper = document.getElementById("cart-items");
  const totalAmount = document.getElementById("total-amount");

  finalMarkup = markupArr.join("");
  cartWrapper.innerHTML = finalMarkup;

  if (!markupArr.length) {
    cartWrapper.innerHTML = "";
  }

  totalAmount.innerHTML = `$${cartSum}`;
};

// ----------------------------------------------------------
// OPTION EVENT HANDLER

// Toggles style change, extracts price, adds product to cart
const handleOptionClick = event => {
  event = event || window.event;
  let selectedOption = event.target || event.srcElement;
  toggleOption(selectedOption);
};