import prepareData from './modules/utils/prepareData';
import Container from './modules/Container';

window.onload = () => {
  prepareData().then((result) => {
    new Container(result).init();
  });
};
