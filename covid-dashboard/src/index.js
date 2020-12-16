import prepareData from './modules/utils/prepareData';
import * as storage from './modules/utils/storage';

prepareData();
console.log(storage.get('covidData'));
