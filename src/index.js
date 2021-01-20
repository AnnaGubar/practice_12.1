import './styles.css';
import pokemonTempl from './templates/pokemon-card.hbs';

const pokemonMarkup = document.querySelector('.js-card-container'); //- div-контейнер для создания шаблона
const searchForm = document.querySelector('.js-search-form');

searchForm.addEventListener('submit', searchHandler); // - слушаем инпут на форме

 function searchHandler (e) {
  e.preventDefault();  // - что бы не перезагружалась страница после ввода
  const form = e.currentTarget; // - для очистки формы
  const id = form.elements.input.value; // - добираемся до значения инпута
  console.log(id);

  fetchPokemonHandler(id)
   .then(markupHandler)
   .catch(errorHandler)
   .finally(() => form.reset());
 }

function fetchPokemonHandler(pokemonId) {
 const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  return fetch(pokemonUrl).then(response => {return response.json();
   });
 }

function markupHandler (pokemon) {
 const markup = pokemonTempl(pokemon); // - шаблон(данные.json)
  pokemonMarkup.innerHTML = markup; // - добавление в html
}

function errorHandler (error) {
 console.log(error);
    alert('ошибка!');
}