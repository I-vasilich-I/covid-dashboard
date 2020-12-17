import prepareData from './modules/utils/prepareData';
import Table from './modules/Table';
import Map from './modules/Map';

window.onload = () => {
  prepareData().then((result) => {
    const table = new Table(result).init(document.body);
    const map = new Map();
    map.init(result);

    table.tableCountriesArray[0].innerDiv.title.innerText = 'Total deaths:';
  });
};
