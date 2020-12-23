/* eslint-disable no-console */

import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import * as Constants from './Constants';

/*
 * Map.clickLegendButton() - show/hide legend
 *
 * this.setPointByCountry(countryName) - change point on map by countryName (case insensitive)
 *
 * changeMarkersColor(markerType) - need to call when click by buttons (or tabs) Confirmed/Deaths/Recovered
 *                                  markerType = TYPE_CASE | TYPE_DEATH | TYPE_RECOVERED
 *
 * Map.getCountryNameByMarkerElement(element) - get country name when click by marker.
 *    There is element = event.target.closest('.mapboxgl-marker');
 *
 */

export default class Map {
  constructor(covidData) {
    this.covidData = covidData;
    this.mapboxgl = mapboxgl;
    this.markers = [];
    this.popups = [];
    this.isFullscreen = false;
  }

  init() {
    this.mapboxgl.accessToken = Constants.MAPBOX_TOKEN;

    this.map = new this.mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 1,
      minZoom: 1,
      center: [0, 0],
    });

    const nav = new mapboxgl.NavigationControl({ visualizePitch: true });

    const scale = new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'metric',
    });

    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(nav, 'top-left');
    this.map.addControl(scale);
    this.showMarkers(Constants.TYPE_CASE);
    document
      .querySelector('.map-container')
      .addEventListener('click', this.mapEventHandler.bind(this));
    Map.createLegend(Constants.TYPE_CASE);

    return this;
  }

  showMarkers(markerType) {
    this.clearMarkers();

    this.covidData.Countries.forEach((country) => {
      const popup = this.createPopup(country);
      const markerOptions = Map.createMarker(country, markerType);

      const marker = new this.mapboxgl.Marker(markerOptions)
        .setLngLat([country.latlng[1], country.latlng[0]])
        .setPopup(popup)
        .addTo(this.map);

      marker.countryName = country.Country;
      this.markers.push(marker);
    });
  }

  clearMarkers() {
    if (this.markers.length > 0) {
      this.markers.forEach((marker) => marker.remove());
      this.markers = [];
    }
  }

  setPoint(lng, lat) {
    this.map.flyTo({
      center: [lng, lat],
      zoom: 3,
      speed: 1.5,
      curve: 1,
      easing(t) {
        return t;
      },
    });
  }

  setPointByCountry(countryName) {
    const country = this.covidData.Countries.find((item) => {
      return item.Country.toLowerCase() === countryName.toLowerCase();
    });

    if (country) {
      this.setPoint(country.latlng[1], country.latlng[0]);
      this.showPopupByCountry(countryName);
    } else {
      throw new Error('Error! Can not set point on map by country name');
    }
  }

  showPopupByCountry(countryName) {
    const marker = this.markers.find((item) => {
      return item.countryName.toLowerCase() === countryName.toLowerCase();
    });
    if (marker) {
      this.hideAllPopups();
      marker.togglePopup();
    } else {
      throw new Error('Error! Can not show popup on map by country name');
    }
  }

  mapEventHandler(e) {
    const element = e.target.closest('.map-button') || e.target.closest('.mapboxgl-marker');
    if (!element) {
      return;
    }

    // console.log(element);
    switch (element.id) {
      case 'map-button-cases':
        console.log('cases');
        // eslint-disable-next-line no-return-assign
        this.changeMarkersColor(Constants.TYPE_CASE);
        break;
      case 'map-button-deaths':
        console.log('deaths');
        this.changeMarkersColor(Constants.TYPE_DEATH);

        break;
      case 'map-button-recovered':
        console.log('recovered');
        this.changeMarkersColor(Constants.TYPE_RECOVERED);

        break;
      case 'legend-button':
        console.log('legend');
        Map.clickLegendButton();
        e.stopImmediatePropagation();

        break;
      case 'marker':
        {
          const countryName = Map.getCountryNameByMarkerElement(element);
          const country = this.findCountryByName(countryName);
          // this.hideAllPopups();

          console.log(Map.getCountryNameByMarkerElement(element));
          this.handleTable(country);
          e.stopImmediatePropagation();
        }
        break;
      default:
        break;
    }
  }

  static getCountryNameByMarkerElement(markerElement) {
    return markerElement.dataset.country;
  }

  changeMarkersColor(markerType) {
    this.showMarkers(markerType);
    Map.createLegend(markerType);
    Map.deactivateTabButtons();
    Map.activateTabButton(markerType);
  }

  static activateTabButton(markerType) {
    const id = Constants.MAP_TAB_BUTTONS_ID[markerType];
    const button = document.querySelector(id);

    button.classList.add('button-checked');
  }

  static deactivateTabButtons() {
    const buttons = document.querySelectorAll('button.map-button');
    console.log(buttons);
    [].map.call(buttons, (element) => element.classList.remove('button-checked'));
  }

  static clickLegendButton() {
    document.querySelector('#legend').classList.toggle('show-legend');
  }

  static createMarker(country, markerType) {
    const el = document.createElement('div');
    el.id = 'marker';
    el.dataset.country = country.Country;

    const markerSize = Map.getMarkerSize(country, markerType);
    el.style.width = `${markerSize}px`;
    el.style.height = `${markerSize}px`;
    el.className = Map.getMarkerClassName(markerType);

    return {
      element: el,
      scale: 1,
    };
  }

  createPopup(country) {
    return new this.mapboxgl.Popup().setHTML(
      `<p>Country: ${country.Country}</p>
      <p>Confirmed: ${country.TotalConfirmed}</p>
      <p>Deaths: ${country.TotalDeaths}</p>
      <p>Recovered: ${country.TotalRecovered}</p>`
    );
  }

  hideAllPopups() {
    // eslint-disable-next-line no-underscore-dangle
    this.markers.map((marker) => (marker._popup.isOpen() ? marker.togglePopup() : null));
  }

  static createLegend(markerType) {
    const legend = document.querySelector('.legend');
    const legendList = legend.querySelector('.legend-list');
    const range = Map.getRangeByMarkerType(markerType);

    if (!legend || !legendList) {
      return;
    }

    legend.dataset.legendType = markerType;
    legendList.innerHTML = `<li class="legend-item">
      <p class="legend-title">${Constants.TYPE_NAMES[markerType]}</p>
    </li>`;

    range.forEach((countOfCases, index) => {
      const circleSize = Constants.MARKER_SIZE[index];

      legendList.append(Map.createLegendItem(circleSize, countOfCases));
    });
  }

  static createLegendItem(circleSize, countOfCases) {
    const legendItem = document.createElement('li');
    const legendCircle = document.createElement('div');
    const legendText = document.createElement('p');

    legendItem.classList.add('legend-item');
    legendCircle.classList.add('legend-circle');
    legendText.classList.add('legend-text');

    legendCircle.style.width = `${circleSize}px`;
    legendCircle.style.height = `${circleSize}px`;
    legendText.innerHTML = `&gt; ${countOfCases}`;

    legendItem.append(legendCircle, legendText);

    return legendItem;
  }

  static getRangeByMarkerType(markerType) {
    let range = [];

    switch (markerType) {
      case Constants.TYPE_CASE:
        range = Constants.CASES_RANGE;
        break;
      case Constants.TYPE_DEATH:
        range = Constants.DEATHS_RANGE;

        break;
      case Constants.TYPE_RECOVERED:
        range = Constants.RECOVERED_RANGE;

        break;
      default:
        range = Constants.CASES_RANGE;

        break;
    }

    return range;
  }

  static getMarkerSize(country, markerType) {
    let range = [];
    let count = 0;

    switch (markerType) {
      case Constants.TYPE_CASE:
        range = Constants.CASES_RANGE;
        count = country.TotalConfirmed;
        break;
      case Constants.TYPE_DEATH:
        range = Constants.DEATHS_RANGE;
        count = country.TotalDeaths;

        break;
      case Constants.TYPE_RECOVERED:
        range = Constants.RECOVERED_RANGE;
        count = country.TotalRecovered;

        break;
      default:
        range = Constants.CASES_RANGE;
        count = country.TotalConfirmed;

        break;
    }

    for (let i = 0; i < range.length; i += 1) {
      if (count >= range[i]) {
        return Constants.MARKER_SIZE[i];
      }
    }
    return Constants.MARKER_SIZE[range.length];
  }

  static getMarkerClassName(markerType) {
    switch (markerType) {
      case Constants.TYPE_CASE:
        return 'marker_cases';
      case Constants.TYPE_DEATH:
        return 'marker_deaths';

      case Constants.TYPE_RECOVERED:
        return 'marker_recovered';

      default:
        return 'marker_cases';
    }
  }

  findCountryByName(countryName) {
    return this.covidData.Countries.find((country) => countryName === country.Country);
  }

  handleTable(country) {
    this.list.activateListCoutnry(country);
    this.list.activateTableCoutnry(country);
  }

  eventHandler(blocks) {
    this.table = blocks.table;
    this.list = blocks.list;
    return this;
  }
}
