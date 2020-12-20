import { createDomElement, numberWithSpaces } from './utils/helpers';

const table = createDomElement({
  elementName: 'div',
  className: 'table',
});
const tableDetails = createDomElement({
  elementName: 'div',
  className: 'table__details',
  parent: table,
});
const tableCountries = createDomElement({
  elementName: 'div',
  className: 'table__countries',
  parent: table,
});

function createCountryContainer(country, propertys = {}) {
  const { countryTitle = 'Total confirmed:', property = 'TotalConfirmed' } = propertys;
  const isSelected = country.selected || false;
  const selectedClassName = isSelected ? ' country__container-active' : '';
  const countryContainer = createDomElement({
    elementName: 'div',
    className: `country__container${selectedClassName}`,
    parent: tableCountries,
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
  const title = createDomElement({
    elementName: 'p',
    parent: countryContainer.cases,
  });
  const amount = createDomElement({
    elementName: 'div',
    parent: countryContainer.cases,
  });
  title.innerText = countryTitle;
  amount.innerText = numberWithSpaces(country[property]);
  countryContainer.countryName.innerText = country.Country;
  countryContainer.country = country;
  // countryContainer.innerDiv = { title, amount, country };
  return countryContainer;
}

function createDetailContainer(obj, global = true) {
  tableDetails.innerHTML = '';
  tableDetails.innerText = obj.Country;
  if (global) tableDetails.innerText = 'Global cases:';
  const detailContainer = createDomElement({
    elementName: 'div',
    className: 'detail__container',
    parent: tableDetails,
  });

  // detail container
  detailContainer.detailConfirmed = createDomElement({
    elementName: 'div',
    className: 'detail__confirmed',
    parent: detailContainer,
  });
  detailContainer.detailDeaths = createDomElement({
    elementName: 'div',
    className: 'detail__deaths',
    parent: detailContainer,
  });
  detailContainer.detailRecoverd = createDomElement({
    elementName: 'div',
    className: 'detail__recovered',
    parent: detailContainer,
  });

  detailContainer.detailConfirmed.innerText = `Confirmed:\n${numberWithSpaces(obj.TotalConfirmed)}`;
  detailContainer.detailDeaths.innerText = `Deaths:\n${numberWithSpaces(obj.TotalDeaths)}`;
  detailContainer.detailRecoverd.innerText = `Recovered:\n${numberWithSpaces(obj.TotalRecovered)}`;
}

export { createCountryContainer, createDetailContainer, table, tableCountries };
