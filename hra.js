// hra.js
//console.log('JavaScriptová hra byla načtena!');
//alert('Vítej ve hře!')

// hra.js

let currentPlayer = 'circle'; // Hru začíná kolečko

let kdoHraje = document.querySelector('.square');

// kliknutí na políčko
const handleClick = (event) => {
  const button = event.target;
  if (button.disabled) return;

  button.classList.add(currentPlayer); // Přidání třídy podle aktuálního hráče

  button.disabled = true; // Zamez dalšímu kliknutí

  switchPlayer(); // Přepni hráče
};

// Přidání posluchačů události ke všem tlačítkům
buttons.forEach((button) => {
  button.addEventListener('click', handleClick);
});

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
