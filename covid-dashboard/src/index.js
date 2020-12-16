import prepareData from './modules/utils/prepareData';
// import * as storage from './modules/utils/storage';

// prepareData();
// console.log(storage.get('covidData'));
// const covidData = async () => {
//   const result = await prepareData();
//   return result;
// };

prepareData().then((result) => console.log(result));
