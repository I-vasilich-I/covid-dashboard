import {
  createCountryContainer,
  createGlobalDetailContainer,
  tableContainer,
} from './createTableContainers';

export default class Table {
  constructor(covidData) {
    this.countries = covidData.Countries;
    this.global = covidData.Global;
    this.date = covidData.Date;
    this.tablCountriesArray = [];
  }

  init(parent) {
    this.countries.forEach((country) => {
      this.tablCountriesArray.push(createCountryContainer(country));
    });
    createGlobalDetailContainer(this.global);
    parent.appendChild(tableContainer);
    return this;
  }
}
