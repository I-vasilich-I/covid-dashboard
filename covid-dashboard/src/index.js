import prepareData from './modules/utils/prepareData';
import Table from './modules/Table';
import Map from './modules/Map';
import List from './modules/List';

window.onload = () => {
  prepareData().then((result) => {
    // const table =
    new Table(result).init().eventHandler();
    new List(result).init().eventHandler();
    const map = new Map(result);
    map.init();
  });
};
