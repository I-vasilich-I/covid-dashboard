import {
  createCountryContainer,
  createDetailContainer,
  table,
  tableCountries,
} from './createTable';
import { createDomElement, sortByProperty } from './utils/helpers';
import createTableTabs from './createTableTabs';

function deactivateButtons(buttons) {
  buttons.map((element) => element.classList.remove('tabs__button-active'));
}

function getPropertiesByType(type) {
  let title = '';
  let property = '';
  let className = '';
  if (type === 'tab-confirmed') {
    property = 'TotalConfirmed';
    title = 'Total confirmed:';
    className = 'confirmed';
  }
  if (type === 'tab-deaths') {
    property = 'TotalDeaths';
    title = 'Total deaths:';
    className = 'deaths';
  }
  if (type === 'tab-recovered') {
    property = 'TotalRecovered';
    title = 'Total recovered:';
    className = 'recovered';
  }
  return { property, countryTitle: title, className };
}

// function updateOneCountryInfo(propertys, element) {
//   const elem = element;
//   const amount = numberWithSpaces(elem.innerDiv.country[propertys.property]);
//   elem.innerDiv.title.innerText = propertys.countryTitle;
//   elem.innerDiv.amount.innerText = amount;
// }

// function updateCountriesInfo(propertys) {
//   this.tableCountriesArray.map((element) => updateOneCountryInfo(propertys, element));
// }

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
    this.tabs = createTableTabs();
    parent.appendChild(table);
    parent.appendChild(this.tabs);
    return this;
  }

  countriesButtonsHandler(event) {
    const buttons = this.tabs.tabsArray;
    const button = event.target.closest('.tabs__button');
    const isActive = button.classList.contains('tabs__button-active');
    if (!button || isActive) return;
    deactivateButtons(buttons);
    button.classList.add('tabs__button-active');
    const propertys = getPropertiesByType(button.id);
    sortByProperty(this.countries, propertys.property, -1);
    tableCountries.innerHTML = '';
    tableCountries.className = `table__countries ${propertys.className}`;
    this.countries.forEach((country) => {
      this.tableCountriesArray.push(createCountryContainer(country, propertys));
    });
  }

  tabsEventHandler() {
    this.tabs.addEventListener('click', (event) => this.countriesButtonsHandler(event));
  }

  eventHandler() {
    this.tabsEventHandler();
    return this;
  }
}
