import debounce from 'lodash.debounce';
import './css/styles.css';

const input = document.querySelector('#search-box');
const divInfo = document.querySelector('.country-info')


const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v2/name';

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    const nameCountry = evt.target.value;
    countriesApi(nameCountry)
        .then(createMarkup)
        .catch(err => console.log(err));
}

function countriesApi(name) {
    return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json()
        })
}

// function createMarkup(arr) {
//     const markup = arr.reduce(acc, obj => acc + console.log(obj.flags.svg), '')
// }

function createMarkup(arr) {
    const markup = arr.reduce((acc, obj) => acc + `<h2><img src="${obj.flags.svg}" alt="flag" width="25px"> ${obj.name}</h2>`,'');

  divInfo.insertAdjacentHTML('beforeend', markup);
}