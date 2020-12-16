import { fecthData, getAsyncData } from './fetchData';
import * as storage from './storage';

function casesPer100K(cases, population) {
  return ((cases * 100000) / population).toFixed(2);
}

async function addAdditionalData(objData) {
  const asyncData = await getAsyncData(objData);
  const covidCountries = asyncData.covidData.Countries;
  const countries = asyncData.countriesData;
  const noSuchCovidCountry = [];
  countries.forEach((country) => {
    const thisCountry =
      covidCountries.find((covidCountry) => covidCountry.CountryCode === country.alpha2Code) ||
      null;
    if (thisCountry) {
      thisCountry.latlng = country.latlng;
      thisCountry.population = country.population;
      thisCountry.flag = country.flag;
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
  storage.set('covidData', asyncData.covidData);
}

// return null if failed to get data from any API;
export default async function prepareData() {
  const countries = await fecthData(
    'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;latlng;population;flag'
  );
  if (!countries) return null;
  const countriesData = await getAsyncData(countries);
  const covidCountries = await fecthData('https://api.covid19api.com/summary');
  if (!covidCountries) return null;
  const covidData = await getAsyncData(covidCountries);
  const objData = {
    covidData,
    countriesData,
  };
  await addAdditionalData(objData);
  return objData.covidData;
}
