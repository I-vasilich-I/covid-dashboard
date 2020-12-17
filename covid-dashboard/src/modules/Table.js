import {
  createCountryContainer,
  createGlobalDetailContainer,
  tableContainer,
} from './createTableContainers';
import * as helpers from './utils/helpers';

export default class Table {
  constructor(covidData) {
    this.countries = covidData.Countries;
    this.global = covidData.Global;
    this.date = covidData.Date;
    this.tablCountriesArray = [];
  }

  init(parent) {
    helpers.sortByProperty(this.countries, 'TotalConfirmed', -1);
    this.countries.forEach((country) => {
      this.tablCountriesArray.push(createCountryContainer(country));
    });
    createGlobalDetailContainer(this.global);
    parent.appendChild(tableContainer);
    return this;
  }
}
