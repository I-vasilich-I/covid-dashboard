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
  const tabs = createDomElement({ elementName: 'div', className: 'tabs__container' });
  tabs.buttonConfirmed = createDomElement({
    elementName: 'button',
    className: 'tabs__button tabs__button-active',
    parent: tabs,
    attributes: [['id', BUTTON_CONFIRMED_ID]],
  });

  tabs.buttonDeaths = createDomElement({
    elementName: 'button',
    className: 'tabs__button',
    parent: tabs,
    attributes: [['id', BUTTON_DEATHS_ID]],
  });
  tabs.buttonRecovered = createDomElement({
    elementName: 'button',
    className: 'tabs__button',
    parent: tabs,
    attributes: [['id', BUTTON_RECOVERED_ID]],
  });
  tabs.buttonTotal = createDomElement({
    elementName: 'button',
    className: 'tabs__button tabs__button-hidden',
    parent: tabs,
    attributes: [['id', BUTTON_TOTAL_ID]],
  });
  tabs.buttonTotal100K = createDomElement({
    elementName: 'button',
    className: 'tabs__button tabs__button-hidden',
    parent: tabs,
    attributes: [['id', BUTTON_TOTAL100K_ID]],
  });
  tabs.buttonNew = createDomElement({
    elementName: 'button',
    className: 'tabs__button tabs__button-hidden',
    parent: tabs,
    attributes: [['id', BUTTON_NEW_ID]],
  });
  tabs.buttonNew100K = createDomElement({
    elementName: 'button',
    className: 'tabs__button tabs__button-hidden',
    parent: tabs,
    attributes: [['id', BUTTON_NEW100K_ID]],
  });

  tabs.buttonConfirmed.innerText = 'Confirmed';
  tabs.buttonDeaths.innerText = 'Deaths';
  tabs.buttonRecovered.innerText = 'Recovered';
  tabs.buttonTotal.innerText = 'Total';
  tabs.buttonTotal100K.innerText = 'T100K';
  tabs.buttonNew.innerText = 'New';
  tabs.buttonNew100K.innerText = 'N100K';

  tabs.tabsArray = [
    tabs.buttonConfirmed,
    tabs.buttonDeaths,
    tabs.buttonRecovered,
    tabs.buttonTotal,
    tabs.buttonTotal100K,
    tabs.buttonNew,
    tabs.buttonNew100K,
  ];
  tabs.countryBtns = [tabs.buttonConfirmed, tabs.buttonDeaths, tabs.buttonRecovered];
  tabs.detailBtns = [tabs.buttonTotal, tabs.buttonTotal100K, tabs.buttonNew, tabs.buttonNew100K];
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
