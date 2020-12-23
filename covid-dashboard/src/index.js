import prepareData from './modules/utils/prepareData';
import Container from './modules/Container';
import Fullscreen from './modules/Fullscreen';

window.onload = () => {
  prepareData().then((result) => {
    new Container(result).init();
    new Fullscreen().init();
  });
};
