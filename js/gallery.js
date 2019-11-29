// SLIDESHOW //
var slideshow = document.querySelector(".slideshow");
var slides = document.querySelectorAll(".slide");
var gridImgSelector = document.querySelector(".grid-img-selector");

gridImgSelector.addEventListener("mouseover", function(e) {
  if (e.target.classList.contains("slide")) {
    switch (e.target.id) {
      case "slide1":
        ReplaceSlideshow(e);
        break;
      case "slide2":
        ReplaceSlideshow(e);
        break;
      case "slide3":
        ReplaceSlideshow(e);
        break;
      case "slide4":
        ReplaceSlideshow(e);
        break;
      case "slide5":
        ReplaceSlideshow(e);
        break;
    }
  }
});

function ReplaceSlideshow(e) {
  slideshow.setAttribute(
    "style",
    `background: url(${e.target.getAttribute("src")})`
  );
  slideshow.classList.remove("animation");
  e.target.addEventListener("mouseout", function(e) {
    slideshow.removeAttribute("style");
    slideshow.classList.add("animation");
  });
}
