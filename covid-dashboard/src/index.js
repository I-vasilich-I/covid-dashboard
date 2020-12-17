import prepareData from './modules/utils/prepareData';
import Table from './modules/Table';

prepareData().then((result) => {
  new Table(result).init(document.body);
});
