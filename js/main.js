const cards = document.querySelectorAll(".card");
let hasVirouCard = false;
let primeiroCard, segundoCard;
let fazBloqueio = false;

function viraCard() {
  if (fazBloqueio) return;
  if (this === primeiroCard) return;

  this.classList.add("vira");
  if (!hasVirouCard) {
    hasVirouCard = true;
    primeiroCard = this;
    return;
  }
  segundoCard = this;
  hasVirouCard = false;
  checkForMath();
}
function checkForMath() {
  if (primeiroCard.dataset.card === segundoCard.dataset.card) {
    desabilitaCards();
    return;
  }
  desviraCards();
}
function desabilitaCards() {
  primeiroCard.removeEventListener("click", viraCard);
  segundoCard.removeEventListener("click", viraCard);

  resetaQuadro();
}

function desviraCards() {
  fazBloqueio = true;

  setTimeout(() => {
    primeiroCard.classList.remove("vira");
    segundoCard.classList.remove("vira");

    resetaQuadro();
  }, 1500);
}
function resetaQuadro() {
  [hasVirouCard, fazBloqueio] = [false, false];
  [primeiroCard, segundoCard] = [null, null];
}

(function embaralhar() {
  cards.forEach((card) => {
    let pontoAleatorio = Math.floor(Math.random() * 12);
    card.style.order = pontoAleatorio;
  });
})();

// forEach vai percorrer cada item da lista
cards.forEach((card) => {
  card.addEventListener("click", viraCard);
});
