import { getPropertiesByType } from './Table';
import { createDomElement, sortByProperty } from './utils/helpers';
import { createListCountryContainer, list, listCountries } from './createList';
import {
  createCountryContainer,
  createDetailContainer,
  //  table,
  tableCountries,
} from './createTable';
import { BUTTONS_ID } from './Constants';

const {
  BUTTON_CONFIRMED_ID,
  BUTTON_DEATHS_ID,
  BUTTON_RECOVERED_ID,
  BUTTON_TOTAL_ID,
  BUTTON_TOTAL100K_ID,
  BUTTON_NEW_ID,
  BUTTON_NEW100K_ID,
} = BUTTONS_ID;

export default class List {
  constructor(covidData) {
    this.countries = covidData.Countries;
    this.targetCountry = null;
    this.global = covidData.Global;
    this.date = covidData.Date;
    this.listCountriesArray = [];
  }

  init() {
    const containerDiv = document.querySelector('.table2-container');
    this.parent = createDomElement({
      elementName: 'div',
      className: 'list__container',
      parent: containerDiv,
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

  getButtonIdBySelectedOption() {
    const option = this.select.value;
    if (option === 'TotalConfirmed') return BUTTON_CONFIRMED_ID;
    if (option === 'TotalDeaths') return BUTTON_DEATHS_ID;
    if (option === 'TotalRecovered') return BUTTON_RECOVERED_ID;
    if (option === 'TotalConfirmedPer100K') return BUTTON_TOTAL100K_ID;
    if (option === 'TotalDeathsPer100K') return BUTTON_TOTAL100K_ID;
    if (option === 'TotalRecoveredPer100K') return BUTTON_TOTAL100K_ID;
    if (option === 'NewConfirmed') return BUTTON_NEW_ID;
    if (option === 'NewDeaths') return BUTTON_NEW_ID;
    if (option === 'NewRecovered') return BUTTON_NEW_ID;
    if (option === 'NewConfirmedPer100K') return BUTTON_NEW100K_ID;
    if (option === 'NewDeathsPer100K') return BUTTON_NEW100K_ID;
    if (option === 'NewRecoveredPer100K') return BUTTON_NEW100K_ID;
    return this;
  }

  handleTableFromMap(country) {
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
    return this;
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

    let selectedBtnId = this.getButtonIdBySelectedOption();
    let selectedCountryBtnId;
    if (
      selectedBtnId === BUTTON_CONFIRMED_ID ||
      selectedBtnId === BUTTON_DEATHS_ID ||
      selectedBtnId === BUTTON_RECOVERED_ID
    ) {
      selectedCountryBtnId = selectedBtnId;
      selectedBtnId = BUTTON_TOTAL_ID;
    }
    const propertys = getPropertiesByType.call(this, selectedBtnId);
    createDetailContainer(propertys.obj, false, propertys.countryTitle);
    // createDetailContainer(country, false);
    const tableTarget = this.table.tableCountriesArray.find((elem) => elem.country === country);
    this.table.tableCountriesArray.forEach((element) =>
      element.classList.remove('country__container-active')
    );
    tableTarget.classList.add('country__container-active');
    tableTarget.scroll(100, 100); // DOESN'T WORK!
    this.table.targetCountry = country;
    this.table.tabs.tabsArray.map((button) => {
      if (button.isDetailBtn) {
        button.classList.remove('tabs__button-hidden');
        button.classList.remove('tabs__button-active');
      }
      const isTheButton = button.id === selectedBtnId;
      if (isTheButton) button.classList.add('tabs__button-active');
      return button;
    });
    // Confirmed, Deaths, Recovered cases
    if (selectedCountryBtnId) {
      const { countryBtns } = this.table.tabs;
      const button = countryBtns.find((elem) => elem.id === selectedCountryBtnId);
      const propertys1 = getPropertiesByType(button.id);
      tableCountries.innerHTML = '';
      tableCountries.className = `table__countries ${propertys1.className}`;
      this.table.tableCountriesArray.length = 0;
      this.countries.forEach((countryEl) => {
        this.table.tableCountriesArray.push(createCountryContainer(countryEl, propertys1));
      });
      this.table.deactivateButtons(countryBtns, 'tabs__button-active');
      const tableTarget1 = this.table.tableCountriesArray.find((elem) => elem.country === country);
      tableTarget1.classList.add('country__container-active');
      button.classList.add('tabs__button-active');
    }
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
    });
    return this;
  }

  listSelectEventHandler() {
    this.selectValue = this.select.value;
    this.select.onclick = () => {
      const isSameAsSelected = this.selectValue === this.select.value;
      if (isSameAsSelected) return;

      // const propertys = getPropertiesByType(this.getButtonIdBySelectedOption());
      // tableCountries.innerHTML = '';
      // tableCountries.className = `table__countries ${propertys.className}`;
      // this.table.tableCountriesArray.length = 0;

      listCountries.innerHTML = '';
      this.selectValue = this.select.value;
      sortByProperty(this.countries, this.selectValue, -1);
      this.countries.forEach((country) => {
        this.listCountriesArray.push(createListCountryContainer(country, this.selectValue));
        // this.table.tableCountriesArray.push(createCountryContainer(country, propertys));
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
