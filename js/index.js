const reseñas = document.querySelector('.reseñas');
const reseñasArray = Array.from(reseñas.children);
const interval = 3000; // tiempo en milisegundos entre cada deslizamiento

let currentIndex = 0;

function deslizar() {
  reseñas.style.transform = `translateX(-${reseñas.clientWidth * currentIndex}px)`;
}

function deslizarAutomático() {
  currentIndex++;
  if (currentIndex >= reseñasArray.length) {
    currentIndex = 0;
  }
  deslizar();
}

setInterval(deslizarAutomático, interval);