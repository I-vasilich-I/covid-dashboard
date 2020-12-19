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

function hideDetailButtons(buttons) {
  buttons.map((element) => element.classList.add('tabs__button-hidden'));
}

function getPropertiesByType(type) {
  const obj = {};
  if (this) obj.Country = this.targetCountry.Country;
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
  if (type === 'tab-total') {
    obj.TotalConfirmed = this.targetCountry.TotalConfirmed;
    obj.TotalDeaths = this.targetCountry.TotalDeaths;
    obj.TotalRecovered = this.targetCountry.TotalRecovered;
    property = 'Total';
    title = 'Total cases:';
    className = 'confirmed';
  }
  if (type === 'tab-total100K') {
    obj.TotalConfirmed = this.targetCountry.TotalConfirmedPer100K;
    obj.TotalDeaths = this.targetCountry.TotalDeathsPer100K;
    obj.TotalRecovered = this.targetCountry.TotalRecoveredPer100K;
    property = 'TotalPer100K';
    title = 'Total cases per 100K:';
    className = 'confirmed';
  }
  if (type === 'tab-new') {
    obj.TotalConfirmed = this.targetCountry.NewConfirmed;
    obj.TotalDeaths = this.targetCountry.NewDeaths;
    obj.TotalRecovered = this.targetCountry.NewRecovered;
    property = 'LastDay';
    title = 'New cases:';
    className = 'confirmed';
  }
  if (type === 'tab-new100K') {
    obj.TotalConfirmed = this.targetCountry.NewConfirmedPer100K;
    obj.TotalDeaths = this.targetCountry.NewDeathsPer100K;
    obj.TotalRecovered = this.targetCountry.NewRecoveredPer100K;
    property = 'LastDayPer100K';
    title = 'New cases per 100K:';
    className = 'confirmed';
  }
  return { property, countryTitle: title, className, obj };
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
    this.targetCountry = null;
    this.global = covidData.Global;
    this.date = covidData.Date;
    this.tableCountriesArray = [];
  }

  init() {
    // const { body } = document;
    const containerDiv = document.querySelector('.table1-container');
    const parent = createDomElement({
      elementName: 'div',
      className: 'table__container',
      parent: containerDiv,
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

  countriesButtonsHandler(button) {
    const { countryBtns, detailBtns } = this.tabs;
    deactivateButtons(countryBtns);
    hideDetailButtons(detailBtns);
    button.classList.add('tabs__button-active');
    const propertys = getPropertiesByType(button.id);
    sortByProperty(this.countries, propertys.property, -1);
    tableCountries.innerHTML = '';
    tableCountries.className = `table__countries ${propertys.className}`;
    this.countries.forEach((country) => {
      this.tableCountriesArray.push(createCountryContainer(country, propertys));
    });
    createDetailContainer(this.global);
    this.targetCountry = null;
    tableCountries.scrollTop = 0;
  }

  detailButtonsHandler(button) {
    const { detailBtns } = this.tabs;
    deactivateButtons(detailBtns);
    button.classList.add('tabs__button-active');
    const propertys = getPropertiesByType.call(this, button.id);
    createDetailContainer(propertys.obj, false, propertys.countryTitle);
    return this;
  }

  tabsEventHandler() {
    this.tabs.addEventListener('click', (event) => {
      const button = event.target.closest('.tabs__button');
      if (!button) return;
      const isActive = button.classList.contains('tabs__button-active');
      if (isActive) return;
      if (button.isDetailBtn) {
        this.detailButtonsHandler(button);
      } else {
        this.countriesButtonsHandler(button);
      }
    });
  }

  tableCountriesEventHandler() {
    tableCountries.addEventListener('click', (event) => {
      const target = event.target.closest('.country__container');
      if (!target) return;
      const { country } = target;
      this.tableCountriesArray.forEach((element) =>
        element.classList.remove('country__container-active')
      );
      target.classList.add('country__container-active');
      this.targetCountry = country;
      createDetailContainer(country, false);
      this.tabs.tabsArray.map((button, idx) => {
        if (button.isDetailBtn) {
          button.classList.remove('tabs__button-hidden');
          button.classList.remove('tabs__button-active');
        }
        if (idx === 3) button.classList.add('tabs__button-active');
        return button;
      });
      this.handleMap(country);
    });
    return this;
  }

  handleMap(country) {
    this.map.setPointByCountry(country.Country);
    return this;
  }

  eventHandler(blocks) {
    this.table = blocks.table;
    this.map = blocks.map;
    this.list = blocks.list;
    this.tabsEventHandler();
    this.tableCountriesEventHandler();
    return this;
  }
}
