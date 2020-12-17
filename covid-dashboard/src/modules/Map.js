/* eslint-disable no-console */

import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import * as Constants from './Constants';

// const mapboxgl = require('mapbox-gl/dist/mapbox-gl');

export default class Map {
  constructor(covidData) {
    this.covidData = covidData;
    this.mapboxgl = mapboxgl;
    this.deathsMarkers = [];

    this.mapboxgl.accessToken = Constants.MAPBOX_TOKEN;

    this.map = new this.mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 1,
      center: [27, 53],
    });

    this.map.addControl(new mapboxgl.FullscreenControl());

    this.init();
  }

  init() {
    this.showMarkers(Constants.TYPE_CASE);
    document.querySelector('.map-container').addEventListener('click', Map.eventHandler.bind(this));
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

      this.deathsMarkers.push(marker);
    });
  }

  clearMarkers() {
    if (this.deathsMarkers.length > 0) {
      this.deathsMarkers.forEach((marker) => marker.remove());
      this.deathsMarkers = [];
    }
  }

  static eventHandler(e) {
    const element = e.target.closest('.map-button');
    console.log(element);
    switch (element.id) {
      case 'map-button-cases':
        console.log('cases');
        // eslint-disable-next-line no-return-assign
        this.showMarkers(Constants.TYPE_CASE);

        break;
      case 'map-button-deaths':
        console.log('deaths');
        this.showMarkers(Constants.TYPE_DEATH);

        break;
      case 'map-button-recovered':
        console.log('recovered');
        this.showMarkers(Constants.TYPE_RECOVERED);

        break;
      default:
        break;
    }
  }

  static createMarker(country, markerType) {
    const el = document.createElement('div');
    el.id = 'marker';

    const markerSize = Map.getMarkerSize(country, markerType);
    el.style.width = `${markerSize}px`;
    el.style.height = `${markerSize}px`;
    el.className = Map.getMarkerClassName(markerType);

    return {
      element: el,
      // color: 'red',
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
}
