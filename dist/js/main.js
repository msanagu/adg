// Image Carousel

const thumbnail = document.querySelector(".img-thumbnail");

const changeImage = event => {
  // Compatibility with Internet Explorer 8 and earlier
  event = event || window.event;
  let targetElement = event.target || event.srcElement;

  // Change the main image src to the target element's src
  let mainImage = document.getElementById("main-image");
  mainImage.src = targetElement.getAttribute("src");
};
