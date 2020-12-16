import { fecthData, getAsyncData } from './fetchData';
import * as storage from './storage';

function isDataUpToDate(data) {
  const dateDate = new Date(data.Date);
  const today = new Date();
  if (
    dateDate.getDate() === today.getDate() - 1 &&
    dateDate.getMonth() === today.getMonth() &&
    dateDate.getFullYear() === today.getFullYear()
  ) {
    console.log('everything is up to date', dateDate, today);
    return true;
  }
  console.log('nope everything is not up to date', dateDate, today);
  return false;
}

function getDataFromLocalStorage(name) {
  const data = storage.get(name);
  return data;
}

function addCoordinates(objData) {
  getAsyncData(objData).then((result) => {
    const covidCountries = result.covidData.Countries;
    const countries = result.countriesData;
    const noSuchCovidCountry = [];
    countries.forEach((country) => {
      const thisCountry =
        covidCountries.find((covidCountry) => covidCountry.CountryCode === country.alpha2Code) ||
        null;
      if (thisCountry) {
        thisCountry.latlng = country.latlng;
        thisCountry.population = country.population;
        thisCountry.flag = country.flag;
      } else {
        noSuchCovidCountry.push(country);
      }
    });
    storage.set('covidData', result);
  });
}

export default function prepareData() {
  let isUptoDate = false;
  let countriesData = getDataFromLocalStorage('CountriesData');
  if (countriesData === null) {
    const flags = fecthData(
      'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;latlng;population;flag'
    );
    getAsyncData(flags).then((result) => {
      storage.set('CountriesData', result);
      countriesData = result;
    });
  }
  let covidData = getDataFromLocalStorage('covidData');
  if (covidData !== null) {
    isUptoDate = isDataUpToDate(covidData);
  }
  if (!isUptoDate) {
    const covid = fecthData('https://api.covid19api.com/summary');
    getAsyncData(covid).then((result) => {
      storage.set('covidData', result);
      covidData = storage.get('covidData');
    });
  }
  const objData = {
    covidData,
    countriesData,
  };
  addCoordinates(objData);
  return storage.get('covidData');
}
