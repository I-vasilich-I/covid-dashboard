import { createDomElement, numberWithSpaces } from './utils/helpers';

const table = createDomElement({
  elementName: 'div',
  className: 'table',
});
const tableCountries = createDomElement({
  elementName: 'div',
  className: 'table__countries',
  parent: table,
});
const tableDetails = createDomElement({
  elementName: 'div',
  className: 'table__details',
  parent: table,
});

function createCountryContainer(country) {
  const countryContainer = createDomElement({
    elementName: 'div',
    className: 'country__container',
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
  title.innerText = 'Total confirmed:';
  amount.innerText = numberWithSpaces(country.TotalConfirmed);
  countryContainer.countryName.innerText = country.Country;
  countryContainer.innerDiv = { title, amount };
  return countryContainer;
}

function createDetailContainer(obj, global = true) {
  tableDetails.innerText = '';
  if (global) tableDetails.innerText = 'Global cases:';
  const detailContainer = createDomElement({
    elementName: 'div',
    className: 'detail__container',
    parent: tableDetails,
  });
  // const dayContainer = createDomElement({
  //   elementName: 'div',
  //   className: 'day__container',
  //   parent: tableDetails,
  // });
  detailContainer.innerText = 'Total cases:';
  // dayContainer.innerText = 'Last day cases:';

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

  // day container
  // dayContainer.dayConfirmed = createDomElement({
  //   elementName: 'div',
  //   className: 'day__confirmed',
  //   parent: dayContainer,
  // });
  // dayContainer.dayDeaths = createDomElement({
  //   elementName: 'div',
  //   className: 'day__deaths',
  //   parent: dayContainer,
  // });
  // dayContainer.dayRecoverd = createDomElement({
  //   elementName: 'div',
  //   className: 'day__recovered',
  //   parent: dayContainer,
  // });

  detailContainer.detailConfirmed.innerText = `Confirmed:\n${numberWithSpaces(obj.TotalConfirmed)}`;
  detailContainer.detailDeaths.innerText = `Deaths:\n${numberWithSpaces(obj.TotalDeaths)}`;
  detailContainer.detailRecoverd.innerText = `Recovered:\n${numberWithSpaces(obj.TotalRecovered)}`;

  // dayContainer.dayConfirmed.innerText = `Confirmed:\n${numberWithSpaces(obj.NewConfirmed)}`;
  // dayContainer.dayDeaths.innerText = `Deaths:\n${numberWithSpaces(obj.NewDeaths)}`;
  // dayContainer.dayRecoverd.innerText = `Recovered:\n${numberWithSpaces(obj.NewRecovered)}`;
}

export { createCountryContainer, createDetailContainer, table };
