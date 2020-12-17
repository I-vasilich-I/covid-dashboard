import { createCountryContainer, createDetailContainer, table } from './createTable';
import { createDomElement, sortByProperty } from './utils/helpers';
import createTableTabs from './createTableTabs';

export default class Table {
  constructor(covidData) {
    this.countries = covidData.Countries;
    this.global = covidData.Global;
    this.date = covidData.Date;
    this.tableCountriesArray = [];
  }

  init() {
    const { body } = document;
    const parent = createDomElement({
      elementName: 'div',
      className: 'table__container',
      parent: body,
    });
    sortByProperty(this.countries, 'TotalConfirmed', -1);
    this.countries.forEach((country) => {
      this.tableCountriesArray.push(createCountryContainer(country));
    });
    createDetailContainer(this.global);
    parent.appendChild(table);
    const tabs = createTableTabs();
    parent.appendChild(tabs);
    return this;
  }
}
