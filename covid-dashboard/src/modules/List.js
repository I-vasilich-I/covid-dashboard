import Table from './Table';
import { createDomElement, sortByProperty } from './utils/helpers';
import { createListCountryContainer, list } from './createList';

export default class List extends Table {
  init() {
    const { body } = document;
    const parent = createDomElement({
      elementName: 'div',
      className: 'list__container',
      parent: body,
    });
    sortByProperty(this.countries, 'TotalConfirmed', -1);
    this.countries.forEach((country) => {
      this.tableCountriesArray.push(createListCountryContainer(country));
    });
    parent.appendChild(list);
    return this;
  }
}
