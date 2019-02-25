// ----------------------------------------------------------
// ORDER OPTIONS & CART

const cartMarkup = [];

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
  const product = option.querySelector(".name");
  const productName = product.innerHTML.toString();

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
            ${productName}
          </p>
        </div>
        <p class="item-price">${price}</p>
      </div>
      <hr />`;

    // Take product item html and populate the cart wrapper div
    cartMarkup.push(markup);

    // Store product name and price in sessionStorage
    const productPrice = parseFloat(price.match(/\d+\.\d+/g)) || 0.0;
    sessionStorage.setItem(productName, productPrice);

    // Change button copy to inform user that item has been added to cart
    option.querySelector(".cta").innerHTML = "Remove From Cart";
  } else {
    // Remove product item html from cart wrapper div
    cartMarkup.pop();

    // Remove product name and price from sessionStorage
    sessionStorage.removeItem(productName);

    // Change button copy to inform user that item is not in cart
    option.querySelector(".cta").innerHTML = "Add To Cart";
  }

  // Populate cart-item div with final markup
  const cartWrapper = document.getElementById("cart-items");
  cartWrapper.innerHTML = !cartMarkup.length ? "" : cartMarkup.join("");

  // Populate total-amount div with sum
  const products = { ...sessionStorage };
  const cartPrices = Object.values(products);
  const cartSum = !cartPrices.length
    ? 0.0
    : cartPrices
        .map(el => parseFloat(el))
        .reduce((sum, amount) => sum + amount);

  const totalAmount = document.getElementById("total-amount");

  totalAmount.innerHTML = `$${cartSum}`;
};

// ----------------------------------------------------------
// OPTION EVENT HANDLER

// Toggles style change, extracts price, adds product to cart
const handleOptionClick = event => {
  event = event || window.event;
  const selectedOption = event.target || event.srcElement;
  toggleOption(selectedOption);
};
