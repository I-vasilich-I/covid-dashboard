import { createDomElement } from './utils/helpers';
import { BUTTONS_ID } from './Constants';

const {
  BUTTON_CONFIRMED_ID,
  BUTTON_DEATHS_ID,
  BUTTON_RECOVERED_ID,
  BUTTON_TOTAL_ID,
  BUTTON_TOTAL100K_ID,
  BUTTON_NEW_ID,
  BUTTON_NEW100K_ID,
} = BUTTONS_ID;

export default function createTableTabs() {
  const tabsDetail = createDomElement({
    elementName: 'div',
    className: 'tabs__container',
  });
  const tabsCountry = createDomElement({
    elementName: 'div',
    className: 'tabs__container',
  });
  const tabs = {
    tabsDetail,
    tabsCountry,
  };
  const buttonConfirmed = createDomElement({
    elementName: 'button',
    className: 'tabs__button tabs__button-active',
    parent: tabsCountry,
    attributes: [['id', BUTTON_CONFIRMED_ID]],
  });

  const buttonDeaths = createDomElement({
    elementName: 'button',
    className: 'tabs__button',
    parent: tabsCountry,
    attributes: [['id', BUTTON_DEATHS_ID]],
  });
  const buttonRecovered = createDomElement({
    elementName: 'button',
    className: 'tabs__button',
    parent: tabsCountry,
    attributes: [['id', BUTTON_RECOVERED_ID]],
  });
  const buttonTotal = createDomElement({
    elementName: 'button',
    className: 'detail__button detail__button-hidden',
    parent: tabsDetail,
    attributes: [['id', BUTTON_TOTAL_ID]],
  });
  const buttonTotal100K = createDomElement({
    elementName: 'button',
    className: 'detail__button detail__button-hidden',
    parent: tabsDetail,
    attributes: [['id', BUTTON_TOTAL100K_ID]],
  });
  const buttonNew = createDomElement({
    elementName: 'button',
    className: 'detail__button detail__button-hidden',
    parent: tabsDetail,
    attributes: [['id', BUTTON_NEW_ID]],
  });
  const buttonNew100K = createDomElement({
    elementName: 'button',
    className: 'detail__button detail__button-hidden',
    parent: tabsDetail,
    attributes: [['id', BUTTON_NEW100K_ID]],
  });

  buttonConfirmed.innerText = 'Confirmed';
  buttonDeaths.innerText = 'Deaths';
  buttonRecovered.innerText = 'Recovered';
  buttonTotal.innerText = 'Total';
  buttonTotal100K.innerText = 'T100K';
  buttonNew.innerText = 'New';
  buttonNew100K.innerText = 'N100K';

  tabs.tabsArray = [
    buttonConfirmed,
    buttonDeaths,
    buttonRecovered,
    buttonTotal,
    buttonTotal100K,
    buttonNew,
    buttonNew100K,
  ];
  tabs.countryBtns = [buttonConfirmed, buttonDeaths, buttonRecovered];
  tabs.detailBtns = [buttonTotal, buttonTotal100K, buttonNew, buttonNew100K];
  tabs.tabsArray.map((elem) => {
    const btn = elem;
    btn.isDetailBtn = !(
      elem.id === BUTTON_CONFIRMED_ID ||
      elem.id === BUTTON_DEATHS_ID ||
      elem.id === BUTTON_RECOVERED_ID
    );
    return btn;
  });
  return tabs;
}
