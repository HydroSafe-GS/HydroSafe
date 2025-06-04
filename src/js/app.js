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

// Trocar cor de fundo
function changeBackground(color) {
  document.body.style.backgroundColor = color;
}


////////////////
// SLIDE SHOW //
////////////////

let slideIndex = 0;
let timeout;

// Função para mostrar os slides automaticamente
function mostrarSlides() {
  const slides = document.getElementsByClassName("slide-fade");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  timeout = setTimeout(mostrarSlides, 5000); // Troca automática a cada 5 segundos
}

// Função para mudar manualmente os slides
function mudarSlide(n) {
  clearTimeout(timeout); // Para temporariamente o automático

  slideIndex += n;
  const slides = document.getElementsByClassName("slide-fade");

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slideIndex < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";

  timeout = setTimeout(mostrarSlides, 5000); // Retoma o automático
}

// Inicia o slideshow quando a página carrega
document.addEventListener("DOMContentLoaded", mostrarSlides);

