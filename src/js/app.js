// Menu hamburguer
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".menu-mobile");

let menuOpen = false;

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuOpen = !menuOpen;

  if (menuOpen) {
    mobileMenu.classList.add("show");
    menuBtn.innerHTML = "&times;";
  } else {
    mobileMenu.classList.remove("show");
    menuBtn.innerHTML = "&#9776;";
  }
});
