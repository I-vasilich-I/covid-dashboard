import * as helpers from './utils/helpers';

const tableContainer = helpers.createDomElement({
  elementName: 'div',
  className: 'table__container',
});
const tableCountries = helpers.createDomElement({
  elementName: 'div',
  className: 'table__countries',
  parent: tableContainer,
});
const tableDetails = helpers.createDomElement({
  elementName: 'div',
  className: 'table__details',
  parent: tableContainer,
});

function createCountryContainer(country) {
  const countryContainer = helpers.createDomElement({
    elementName: 'div',
    className: 'country__container',
    parent: tableCountries,
  });
  countryContainer.cases = helpers.createDomElement({
    elementName: 'div',
    className: 'country__cases',
    parent: countryContainer,
  });
  countryContainer.countryName = helpers.createDomElement({
    elementName: 'div',
    className: 'country__name',
    parent: countryContainer,
  });
  const title = helpers.createDomElement({
    elementName: 'p',
    parent: countryContainer.cases,
  });
  const amount = helpers.createDomElement({
    elementName: 'div',
    parent: countryContainer.cases,
  });
  title.innerText = 'Total confirmed:';
  amount.innerText = helpers.numberWithSpaces(country.TotalConfirmed);
  countryContainer.countryName.innerText = country.Country;
  countryContainer.innerDiv = { title, amount };
  return countryContainer;
}

function createGlobalDetailContainer(obj) {
  const totalContainer = helpers.createDomElement({
    elementName: 'div',
    className: 'total__container',
    parent: tableDetails,
  });
  const dayContainer = helpers.createDomElement({
    elementName: 'div',
    className: 'day__container',
    parent: tableDetails,
  });

  // total container
  totalContainer.totalConfirmed = helpers.createDomElement({
    elementName: 'div',
    className: 'total__confirmed',
    parent: totalContainer,
  });
  totalContainer.totalDeaths = helpers.createDomElement({
    elementName: 'div',
    className: 'total__deaths',
    parent: totalContainer,
  });
  totalContainer.totalRecoverd = helpers.createDomElement({
    elementName: 'div',
    className: 'total__recovered',
    parent: totalContainer,
  });

  // day container
  dayContainer.dayConfirmed = helpers.createDomElement({
    elementName: 'div',
    className: 'day__confirmed',
    parent: dayContainer,
  });
  dayContainer.dayDeaths = helpers.createDomElement({
    elementName: 'div',
    className: 'day__deaths',
    parent: dayContainer,
  });
  dayContainer.dayRecoverd = helpers.createDomElement({
    elementName: 'div',
    className: 'day__recovered',
    parent: dayContainer,
  });

  totalContainer.totalConfirmed.innerText = obj.TotalConfirmed;
  totalContainer.totalDeaths.innerText = obj.TotalDeaths;
  totalContainer.totalRecoverd.innerText = obj.TotalRecovered;

  dayContainer.dayConfirmed.innerText = obj.NewConfirmed;
  dayContainer.dayDeaths.innerText = obj.NewDeaths;
  dayContainer.dayRecoverd.innerText = obj.NewRecovered;
}

export { createCountryContainer, createGlobalDetailContainer, tableContainer };
