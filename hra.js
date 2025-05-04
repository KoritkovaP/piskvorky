// hra.js
//console.log('JavaScriptová hra byla načtena!'); //check
//alert('Vítej ve hře!')

import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle'; // Hru zacina kolecko
const buttons = document.querySelectorAll('.game__field');

//let kdoHraje = document.querySelector('.square');

// kliknutí na políčko
const handleClick = (event) => {
  const button = event.target;
  if (currentPlayer === 'circle') {
    currentButton.classList.add('game__field--circle-black');
    currentButton.innerHTML = `<img src="circle-black.svg" alt="krouzek">`;
    currentPlayer = 'cross';
  } else {
    currentButton.classList.add('game__field--cross-black');
    currentButton.innerHTML = `<img src="cross-black.svg" alt="krizek">`;
    currentPlayer = 'circle';
  }

  document.querySelector('.game__options--state div').innerHTML = `
    <img src="${currentPlayer}.svg" alt="${
    currentPlayer === 'circle' ? 'krouzek' : 'krizek'
  }">`;

  // zamezeni moznosti zmenit tah opakovanym kliknutim na to stejny button
  currentButton.disabled = true;

  let currentField = Array.from(gameButtons);

  const rewrittenField = currentField.map((fieldSquare) => {
    if (fieldSquare.classList.contains('game__field--circle-black')) {
      return 'o';
    } else if (fieldSquare.classList.contains('game__field--cross-black')) {
      return 'x';
    }
    return '_';
  });

  const winner = findWinner(rewrittenField);

  setTimeout(() => {
    if (winner === 'o' || winner === 'x') {
      const nameofWinner = winner === 'o' ? 'kolecko vyhralo' : 'krizek vyhral';
      alert(`${nameofWinner}.`);
    } else if (winner === 'tie') {
      alert('hra byla nerozhodne.');
    }
    if (winner) {
      location.reload();
    }
  }, 100);
};

gameButtons.forEach((button) => {
  button.addEventListener('click', chosenButton);
});

// if (button.disabled) return;
//button.classList.add(currentPlayer); // Přidání třídy podle aktuálního hráče
//button.disabled = true; // Zamez dalšímu kliknutí
//switchPlayer(); // Přepni hráče
//};
// Přidání posluchačů události ke všem tlačítkům
//buttons.forEach((button) => {
//button.addEventListener('click', handleClick);
//});
//1st Option
//if (currentPlayer === 'circle') {
// event.target.classList.add('game__field--circle');
//currentPlayer = 'cross';
// } else {
// event.target.classList.add('game__field--cross');
//currentPlayer = 'circle';
//}
//event.target.disabled = true;
//};

//const buttons = document.querySelectorAll('.game__field');
//buttons.forEach((button) => {
// button.addEventListener('click', handleClick);
//});
