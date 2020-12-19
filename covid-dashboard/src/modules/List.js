import Table from './Table';
import { createDomElement, sortByProperty } from './utils/helpers';
import { createListCountryContainer, list, listCountries } from './createList';
import {
  // createCountryContainer,
  createDetailContainer,
  //  table,
  // tableCountries,
} from './createTable';

export default class List extends Table {
  constructor(covidData) {
    super(covidData);
    this.listCountriesArray = [];
  }

  init() {
    const { body } = document;
    this.parent = createDomElement({
      elementName: 'div',
      className: 'list__container',
      parent: body,
    });
    sortByProperty(this.countries, 'TotalConfirmed', -1);
    this.countries.forEach((country) => {
      this.listCountriesArray.push(createListCountryContainer(country));
    });
    this.generateSelectPanel();
    this.parent.appendChild(list);
    this.parent.appendChild(this.select);
    return this;
  }

  generateSelectPanel() {
    this.select = createDomElement({ elementName: 'select', className: 'select' });
    createDomElement({
      elementName: 'option',
      className: 'option',
      parent: this.select,
      attributes: [['value', 'TotalConfirmed']],
    }).innerText = 'Total confirmed';
    createDomElement({
      elementName: 'option',
      className: 'option',
      parent: this.select,
      attributes: [['value', 'TotalDeaths']],
    }).innerText = 'Total deaths';
    createDomElement({
      elementName: 'option',
      className: 'option',
      parent: this.select,
      attributes: [['value', 'TotalRecovered']],
    }).innerText = 'Total recovered';
    createDomElement({
      elementName: 'option',
      className: 'option',
      parent: this.select,
      attributes: [['value', 'TotalConfirmedPer100K']],
    }).innerText = 'Total confirmed per 100K';
    createDomElement({
      elementName: 'option',
      className: 'option',
      parent: this.select,
      attributes: [['value', 'TotalDeathsPer100K']],
    }).innerText = 'Total deaths per 100K';
    createDomElement({
      elementName: 'option',
      className: 'option',
      parent: this.select,
      attributes: [['value', 'TotalRecoveredPer100K']],
    }).innerText = 'Total recovered per 100K';
    createDomElement({
      elementName: 'option',
      className: 'option',
      parent: this.select,
      attributes: [['value', 'NewConfirmed']],
    }).innerText = 'New confirmed';
    createDomElement({
      elementName: 'option',
      className: 'option',
      parent: this.select,
      attributes: [['value', 'NewDeaths']],
    }).innerText = 'New deaths';
    createDomElement({
      elementName: 'option',
      className: 'option',
      parent: this.select,
      attributes: [['value', 'NewRecovered']],
    }).innerText = 'New recovered';
    createDomElement({
      elementName: 'option',
      className: 'option',
      parent: this.select,
      attributes: [['value', 'NewConfirmedPer100K']],
    }).innerText = 'New confirmed per 100K';
    createDomElement({
      elementName: 'option',
      className: 'option',
      parent: this.select,
      attributes: [['value', 'NewDeathsPer100K']],
    }).innerText = 'New deaths per 100K';
    createDomElement({
      elementName: 'option',
      className: 'option',
      parent: this.select,
      attributes: [['value', 'NewRecoveredPer100K']],
    }).innerText = 'New recovered per 100K';
  }

  handleTable(country) {
    if (country === null) {
      this.table.tableCountriesArray.forEach((element) =>
        element.classList.remove('country__container-active')
      );
      this.table.tabs.detailBtns.map((element) => element.classList.add('tabs__button-hidden'));
      createDetailContainer(this.global);
      return this;
    }
    createDetailContainer(country, false);
    const tableTarget = this.table.tableCountriesArray.find((elem) => elem.country === country);
    this.table.tableCountriesArray.forEach((element) =>
      element.classList.remove('country__container-active')
    );
    tableTarget.classList.add('country__container-active');
    tableTarget.scroll(100, 100);
    this.table.targetCountry = country;
    this.table.tabs.tabsArray.map((button, idx) => {
      if (button.isDetailBtn) {
        button.classList.remove('tabs__button-hidden');
        button.classList.remove('tabs__button-active');
      }
      if (idx === 3) button.classList.add('tabs__button-active');
      return button;
    });
    return this;
  }

  handleMap(country) {
    this.map.setPointByCountry(country.Country);
    return this;
  }

  listCountriesEventHandler() {
    listCountries.addEventListener('click', (event) => {
      const target = event.target.closest('.country__container');
      if (!target) return;
      const { country } = target;
      this.listCountriesArray.forEach((element) =>
        element.classList.remove('country__container-active')
      );
      target.classList.add('country__container-active');
      this.targetCountry = country;
      this.handleTable(country);
      // this.handleMap(country);
    });
    return this;
  }

  listSelectEventHandler() {
    this.selectValue = this.select.value;
    this.select.onclick = () => {
      const isSameAsSelected = this.selectValue === this.select.value;
      if (isSameAsSelected) return;
      listCountries.innerHTML = '';
      this.selectValue = this.select.value;
      sortByProperty(this.countries, this.selectValue, -1);
      this.countries.forEach((country) => {
        this.listCountriesArray.push(createListCountryContainer(country, this.selectValue));
      });
      listCountries.scrollTop = 0;
      this.handleTable(null);
    };
    return this;
  }

  eventHandler(blocks) {
    this.table = blocks.table;
    this.map = blocks.map;
    this.listCountriesEventHandler();
    this.listSelectEventHandler();
    return this;
  }
}
