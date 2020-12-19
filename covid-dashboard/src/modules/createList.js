import { createDomElement, numberWithSpaces } from './utils/helpers';

const list = createDomElement({
  elementName: 'div',
  className: 'list',
});

const listCountries = createDomElement({
  elementName: 'div',
  className: 'list__countries',
  parent: list,
});

function createListCountryContainer(country, property = 'TotalConfirmed') {
  const countryContainer = createDomElement({
    elementName: 'div',
    className: 'country__container',
    parent: listCountries,
  });
  countryContainer.flag = createDomElement({
    elementName: 'img',
    className: 'country__flag',
    parent: countryContainer,
    attributes: [
      ['src', country.flag],
      ['alt', country.Country],
    ],
  });
  countryContainer.cases = createDomElement({
    elementName: 'div',
    className: 'country__cases',
    parent: countryContainer,
  });
  countryContainer.countryName = createDomElement({
    elementName: 'div',
    className: 'country__name',
    parent: countryContainer,
  });
  const amount = createDomElement({
    elementName: 'div',
    parent: countryContainer.cases,
  });
  amount.innerText = numberWithSpaces(country[property]);
  countryContainer.countryName.innerText = country.Country;
  countryContainer.country = country;
  return countryContainer;
}

export { createListCountryContainer, list, listCountries };
