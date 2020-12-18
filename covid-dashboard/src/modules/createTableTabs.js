import { createDomElement } from './utils/helpers';

export default function createTableTabs() {
  const tabs = createDomElement({ elementName: 'div', className: 'tabs__container' });
  tabs.buttonConfirmed = createDomElement({
    elementName: 'button',
    className: 'tabs__button tabs__button-active',
    parent: tabs,
    attributes: [['id', 'tab-confirmed']],
  });

  tabs.buttonDeaths = createDomElement({
    elementName: 'button',
    className: 'tabs__button',
    parent: tabs,
    attributes: [['id', 'tab-deaths']],
  });
  tabs.buttonRecovered = createDomElement({
    elementName: 'button',
    className: 'tabs__button',
    parent: tabs,
    attributes: [['id', 'tab-recovered']],
  });
  tabs.buttonTotal = createDomElement({
    elementName: 'button',
    className: 'tabs__button tabs__button-hidden',
    parent: tabs,
    attributes: [['id', 'tab-total']],
  });
  tabs.buttonTotal100K = createDomElement({
    elementName: 'button',
    className: 'tabs__button tabs__button-hidden',
    parent: tabs,
    attributes: [['id', 'tab-total100K']],
  });
  tabs.buttonNew = createDomElement({
    elementName: 'button',
    className: 'tabs__button tabs__button-hidden',
    parent: tabs,
    attributes: [['id', 'tab-new']],
  });
  tabs.buttonNew100K = createDomElement({
    elementName: 'button',
    className: 'tabs__button tabs__button-hidden',
    parent: tabs,
    attributes: [['id', 'tab-new100K']],
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
      elem.id === 'tab-confirmed' ||
      elem.id === 'tab-deaths' ||
      elem.id === 'tab-recovered'
    );
    return btn;
  });
  return tabs;
}
