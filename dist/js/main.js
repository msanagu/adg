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

// ORDER OPTIONS

// const price = string.split(' ').filter(function(el) {return el.startsWith('$');});

const toggleOption = event => {
  // Compatibility with Internet Explorer 8 and earlier
  event = event || window.event;
  let selectedOption = event.target;

  // Adds green background, box-shadow, and border when selected
  selectedOption.classList.toggle("selected");
};
