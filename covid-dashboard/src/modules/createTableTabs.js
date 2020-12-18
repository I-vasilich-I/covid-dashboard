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
    className: 'tabs__button tabs__button-active tabs__button-hidden',
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
  return tabs;
}

// <div class="w3-bar w3-black">
// <button class="w3-bar-item w3-button tablink w3-red" onclick="openCity(event,'London')">London</button>
// <button class="w3-bar-item w3-button tablink" onclick="openCity(event,'Paris')">Paris</button>
// <button class="w3-bar-item w3-button tablink" onclick="openCity(event,'Tokyo')">Tokyo</button>
// </div>

// <div id="London" class="w3-container w3-border city">
// <h2>London</h2>
// <p>London is the capital city of England.</p>
// </div>

// <div id="Paris" class="w3-container w3-border city" style="display:none">
// <h2>Paris</h2>
// <p>Paris is the capital of France.</p>
// </div>

// <div id="Tokyo" class="w3-container w3-border city" style="display:none">
// <h2>Tokyo</h2>
// <p>Tokyo is the capital of Japan.</p>
// </div>
// </div>

// <script>
// function openCity(evt, cityName) {
// var i, x, tablinks;
// x = document.getElementsByClassName("city");
// for (i = 0; i < x.length; i++) {
// x[i].style.display = "none";
// }
// tablinks = document.getElementsByClassName("tablink");
// for (i = 0; i < x.length; i++) {
// tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
// }
// document.getElementById(cityName).style.display = "block";
// evt.currentTarget.className += " w3-red";
// }
// </script>
