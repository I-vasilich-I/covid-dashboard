import Keyboard from 'simple-keyboard';
import { getPropertiesByType } from './Table';
import { createDomElement, sortByProperty } from './utils/helpers';
import { createListCountryContainer, list, listCountries } from './createList';
import {
  createCountryContainer,
  createDetailContainer,
  //  table,
  tableCountries,
} from './createTable';
import { BUTTONS_ID, LIST_STATES, TABLE_COUNTRY_STATES } from './Constants';

const { BUTTON_CONFIRMED_ID, BUTTON_DEATHS_ID, BUTTON_RECOVERED_ID, BUTTON_TOTAL_ID } = BUTTONS_ID;
let that;
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
    this.generateSearchInputAndKeyBoard();
    this.parent.appendChild(this.searchContainer);
    this.parent.appendChild(list);
    this.parent.appendChild(this.select);
    that = this;
    return this;
  }

  generateSearchInputAndKeyBoard() {
    this.searchContainer = createDomElement({ elementName: 'div', className: 'search-container' });
    this.inputL = createDomElement({
      elementName: 'input',
      className: 'input',
      parent: this.searchContainer,
      attributes: [['placeholder', 'Search country by name...']],
    });
    this.keyboardBtn = createDomElement({
      elementName: 'img',
      parent: this.searchContainer,
      attributes: [['src', 'assets/images/keyboard-key.svg']],
    });
    this.keyboardDiv = document.querySelector('.simple-keyboard');
    this.keyboardDiv.classList.add('hidden');

    this.keyboard = new Keyboard({
      // eslint-disable-next-line no-use-before-define
      onChange: (input) => onChange(input),
      // eslint-disable-next-line no-use-before-define
      onKeyPress: (button) => onKeyPress(button),
      theme: 'hg-theme-default myTheme1',
    });

    function onChange(input) {
      document.querySelector('.input').value = input;
      that.filterCountries(that.table.tableCountriesArray, input);
      that.filterCountries(that.listCountriesArray, input);
    }

    function onKeyPress(button) {
      // eslint-disable-next-line no-use-before-define
      if (button === '{shift}' || button === '{lock}') handleShift();
    }

    function handleShift() {
      const currentLayout = this.keyboard.options.layoutName;
      const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

      this.keyboard.setOptions({
        layoutName: shiftToggle,
      });
    }

    this.searchHandler();
  }

  filterCountries(array, value) {
    array
      .map((elem) => {
        elem.classList.add('country__container-hidden');
        return elem;
      })
      .filter((div) => div.country.Country.toUpperCase().includes(value.toUpperCase()))
      .map((country) => country.classList.remove('country__container-hidden'));
    return this;
  }

  searchHandler() {
    this.keyboardDiv.classList.add('hidden');
    this.keyboardBtn.addEventListener('click', () => {
      this.keyboardDiv.classList.toggle('hidden');
    });

    this.inputL.addEventListener('input', (event) => {
      this.keyboard.setInput(event.target.value);
      this.filterCountries(this.listCountriesArray, event.target.value);
      this.filterCountries(this.table.tableCountriesArray, event.target.value);
    });
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
    return Object.values(LIST_STATES).find((elem) => elem.inList === option).buttonId;
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
    this.activateTableCoutnry(country);
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

  activateListCoutnry(country, target = null) {
    let listTarget = target;
    this.listCountriesArray.forEach((element) =>
      element.classList.remove('country__container-active')
    );
    if (target === null) {
      listTarget = this.listCountriesArray.find((elem) => elem.country === country);
      // 200px from top of scroll div;
      listCountries.scroll({
        top: listTarget.offsetTop - 200,
        left: 100,
        behavior: 'smooth',
      });
    }
    listTarget.classList.add('country__container-active');
    this.targetCountry = country;
  }

  activateTableCoutnry(country) {
    const tableTarget = this.table.tableCountriesArray.find((elem) => elem.country === country);
    this.table.tableCountriesArray.forEach((element) =>
      element.classList.remove('country__container-active')
    );
    tableTarget.classList.add('country__container-active');
    // 200px from top of scroll div;
    tableCountries.scroll({
      top: tableTarget.offsetTop - 200,
      left: 100,
      behavior: 'smooth',
    });
  }

  listCountriesEventHandler() {
    listCountries.addEventListener('click', (event) => {
      const target = event.target.closest('.country__container');
      if (!target) return;
      const { country } = target;
      this.activateListCoutnry(country, target);
      this.handleTable(country);
      this.map.setPointByCountry(country.Country);
    });
    return this;
  }

  listSelectEventHandler() {
    this.selectValue = this.select.value;
    this.select.onclick = () => {
      const isSameAsSelected = this.selectValue === this.select.value;
      if (isSameAsSelected) return;
      this.selectValue = this.select.value;
      const countryStateKey = Object.keys(TABLE_COUNTRY_STATES).find(
        (key) => TABLE_COUNTRY_STATES[key].title === this.selectValue
      );
      const countryState = TABLE_COUNTRY_STATES[countryStateKey];
      let propertys;
      if (countryState) {
        const { countryBtns } = this.table.tabs;
        const button = countryBtns.find((btn) => btn.id === countryState.buttonId);
        this.table.deactivateButtons(countryBtns, 'tabs__button-active');
        this.table.hideDetailButtons();
        button.classList.add('tabs__button-active');
        propertys = getPropertiesByType(this.getButtonIdBySelectedOption());
        tableCountries.innerHTML = '';
        tableCountries.className = `table__countries ${propertys.className}`;
        this.table.tableCountriesArray.length = 0;
      }
      listCountries.innerHTML = '';

      const { mapType } = Object.values(LIST_STATES).find(
        (elem) => elem.inList === this.selectValue
      );
      this.map.changeMarkersColor(mapType);
      sortByProperty(this.countries, this.selectValue, -1);
      this.countries.forEach((country) => {
        this.listCountriesArray.push(createListCountryContainer(country, this.selectValue));
        if (countryState)
          this.table.tableCountriesArray.push(createCountryContainer(country, propertys));
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
