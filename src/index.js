import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import './css/styles.css';

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    divCountryInfo: document.querySelector('.country-info'),
}

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
     const nameCountry = evt.target.value.trim();
    clearMarkup();
    if (nameCountry !== '') {
        fetchCountries(nameCountry)
            .then(data => {
                if (data.length === 0) {
                    Notiflix.Notify.failure("Oops, there is no country with that name");
                } else if (data.length === 1) {
                    renderOneCountry(data)
                } else if (data.length >= 2 && data.length <= 10) {
                    markupToSomeResult(data);
                } else {
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                }
            })
        .catch(err => console.log(err));
    }
}

function markupToSomeResult(countries) {
    const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
    refs.countryList.innerHTML = markup;
}

function renderOneCountry(countries) {
      const markup = countries
        .map(country => {
          return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
            country.name.official
          }" width="30" hight="20">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
        })
        .join('');
      refs.divCountryInfo.innerHTML = markup;
}

function clearMarkup() {
    refs.divCountryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}