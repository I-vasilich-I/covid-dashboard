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
  const data = storage.get(name) || -1;
  return data;
}

export default function prepareData() {
  let isUptoDate = true;
  let flagsData = getDataFromLocalStorage('CountriesData');
  if (flagsData === -1) {
    const flags = fecthData(
      'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;latlng;population;flag'
    );
    flagsData = getAsyncData(flags, 'CountriesData');
  }
  let covidData = getDataFromLocalStorage('covidData');
  if (covidData !== -1) {
    isUptoDate = isDataUpToDate(covidData);
  }
  if (!isUptoDate) {
    const covid = fecthData('https://api.covid19api.com/summary');
    covidData = getAsyncData(covid, 'covidData');
  }
}
