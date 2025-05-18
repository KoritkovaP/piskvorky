// hra.js
//console.log('JavaScriptová hra byla načtena!'); //check
//alert('Vítej ve hře!')

import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle'; // Hru zacina kolecko
const button = document.querySelectorAll('.game__field');

//let kdoHraje = document.querySelector('.square');

// kliknutí na políčko
const handleClick = (event) => {
  const button = event.target;
  if (currentPlayer === 'circle') {
    button.classList.add('game__field--circle-black');
    button.innerHTML = `<img src="circle-black.svg" alt="krouzek">`;
    currentPlayer = 'cross';
  } else {
    button.classList.add('game__field--cross-black');
    button.innerHTML = `<img src="cross-black.svg" alt="krizek">`;
    currentPlayer = 'circle';
  }

  document.querySelector('.game__options--state div').innerHTML = `
    <img src="${currentPlayer}.svg" alt="${
    currentPlayer === 'circle' ? 'krouzek' : 'krizek'
  }">`;

  // zamezeni moznosti zmenit tah opakovanym kliknutim na to stejny button
  button.disabled = true;

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

if (currentPlayer === 'cross') {
  const response = await fetch(
    'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: rewrittenField,
        player: 'x',
      }),
    },
  );
  const data = await response.json();
  const { x, y } = data.position;
  const field = gameButtons[x + y * 10];
  field.disabled = false;
  field.click();

  setTimeout(() => {
    gameButtons.forEach((button) => {
      const isTaken =
        button.classList.contains('game__field--square-circle') ||
        button.classList.contains('game__field--square-cross');
      button.disabled = isTaken;
    });
  }, 200);
}

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
