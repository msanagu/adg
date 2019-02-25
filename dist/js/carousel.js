// ----------------------------------------------------------
// IMAGE CAROUSEL

const changeImage = event => {
  // Compatibility with Internet Explorer 8 and earlier
  event = event || window.event;
  const targetElement = event.target || event.srcElement;

  // Change the main image src to the target element's src
  const mainImage = document.getElementById("main-image");

  // Only change the image if the click happens on image and not any other part of the div element
  if (targetElement.tagName === "IMG") {
    mainImage.src = targetElement.getAttribute("src");
  }
};
