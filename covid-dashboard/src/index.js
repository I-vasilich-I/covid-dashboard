import prepareData from './modules/utils/prepareData';
import Table from './modules/Table';
import Map from './modules/Map';

window.onload = () => {
  prepareData().then((result) => {
    // const table =
    new Table(result).init(document.body).eventHandler();
    const map = new Map(result);
    map.init();
  });
};
