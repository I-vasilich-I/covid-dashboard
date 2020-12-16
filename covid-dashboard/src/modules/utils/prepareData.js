import { fecthData, getAsyncData } from './fetchData';
import * as storage from './storage';

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
    storage.set('covidData', result.covidData);
  });
}

export default async function prepareData() {
  let countriesData = storage.get('CountriesData');
  if (countriesData === null) {
    const flags = fecthData(
      'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;latlng;population;flag'
    );
    getAsyncData(flags).then((result) => {
      storage.set('CountriesData', result);
      countriesData = result;
    });
  }
  fecthData('https://api.covid19api.com/summary').then((res) => {
    getAsyncData(res)
      .then((result) => {
        storage.set('covidData', result);
        return result;
      })
      .then((result) => {
        const objData = {
          covidData: result,
          countriesData,
        };
        addCoordinates(objData);
      });
  });
}
