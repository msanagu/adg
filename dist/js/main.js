// Image Carousel
const thumbnail = document.querySelectorAll(".img-thumbnail");
const option = document.querySelector(".option");

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

const toggleOption = () => {
  option.classList.toggle("selected");
};

// Listen for option click
option.addEventListener("click", toggleOption);
