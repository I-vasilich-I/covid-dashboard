import { fecthData, getAsyncData } from './fetchData';
import * as storage from './storage';
import { COUNTRIES_COORDINATS_URL, COVID_DATA_URL, COVID_DATA_PER_YEAR_URL } from '../Constants';

function casesPer100K(cases, population) {
  return ((cases * 100000) / population).toFixed(2);
}

async function addAdditionalData(objData) {
  const asyncData = await getAsyncData(objData);
  const covidCountries = asyncData.covidData.Countries;
  const countries = asyncData.countriesData;
  const { covidDataPerYear } = objData;
  const noSuchCovidCountry = [];
  countries.forEach((country) => {
    const thisCountry =
      covidCountries.find((covidCountry) => covidCountry.CountryCode === country.alpha2Code) ||
      null;
    if (thisCountry) {
      thisCountry.latlng = country.latlng;
      thisCountry.population = country.population;
      thisCountry.flag = country.flag;
      // ZHIVE_BELARUS!
      if (thisCountry.Country === 'Belarus') {
        thisCountry.flag = 'assets/icons/belarus-flag.svg';
      }
      // ZHIVE!:)
      thisCountry.TotalDeathsPer100K = casesPer100K(
        thisCountry.TotalDeaths,
        thisCountry.population
      );
      thisCountry.TotalRecoveredPer100K = casesPer100K(
        thisCountry.TotalRecovered,
        thisCountry.population
      );
      thisCountry.TotalConfirmedPer100K = casesPer100K(
        thisCountry.TotalConfirmed,
        thisCountry.population
      );
      thisCountry.NewDeathsPer100K = casesPer100K(thisCountry.NewDeaths, thisCountry.population);
      thisCountry.NewRecoveredPer100K = casesPer100K(
        thisCountry.NewRecovered,
        thisCountry.population
      );
      thisCountry.NewConfirmedPer100K = casesPer100K(
        thisCountry.NewConfirmed,
        thisCountry.population
      );
    } else {
      noSuchCovidCountry.push(country);
    }
  });
  const dataToSave = asyncData.covidData;
  covidDataPerYear.map((elem) => {
    const thisCountry = dataToSave.Countries.find(
      (count) => count.Country.toUpperCase() === elem.country.toUpperCase()
    );
    if (thisCountry) {
      const temp = elem;
      temp.population = thisCountry.population;
    }
    return elem;
  });
  const date = new Date();
  storage.set('covidData', { date, covidData: dataToSave });
  storage.set('covidDataPerYear', { date, covidDataPerYear });
}

function isSameDay(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function checkLocalStorage() {
  const dataToCheck = storage.get('covidData');
  const dataPerYearToCheck = storage.get('covidDataPerYear');
  if (dataToCheck === null || dataPerYearToCheck === null) return null;
  const obj = { covidData: dataToCheck.covidData, dataPerYearToCheck };
  if (isSameDay(new Date(dataToCheck.date))) return obj;
  return null;
}
// return null if failed to get data from any API;
export default async function prepareData() {
  const localData = checkLocalStorage();
  const countries = await fecthData(COUNTRIES_COORDINATS_URL);
  if (localData !== null) {
    return localData;
  }
  if (!countries) return null;
  const countriesData = await getAsyncData(countries);
  const covidCountries = await fecthData(COVID_DATA_URL);
  if (!covidCountries) return null;
  const covidData = await getAsyncData(covidCountries);
  const covidDataPerYearFetch = await fecthData(COVID_DATA_PER_YEAR_URL);
  if (!covidDataPerYearFetch) return null;
  const covidDataPerYear = await getAsyncData(covidDataPerYearFetch);

  const objData = {
    covidData,
    countriesData,
    covidDataPerYear,
  };
  await addAdditionalData(objData);
  // return objData.covidData;
  return { covidData, covidDataPerYear };
}
