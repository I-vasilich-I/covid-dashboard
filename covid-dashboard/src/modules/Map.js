/* eslint-disable no-console */
// npm install mapbox-gl --save

import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.js';
// import { mapboxgl } from '../node_modules/mapbox-gl/dist/mapbox-gl.js';
import * as Constants from './Constants';

// const mapboxgl = require('mapbox-gl/dist/mapbox-gl');

export default class Map {
  constructor() {
    this.mapboxgl = mapboxgl;
    // this.init();
  }

  init(covidData) {
    console.log(new Date().toUTCString());
    console.log(this.mapboxgl);
    console.log(covidData);
    this.mapboxgl.accessToken = Constants.MAPBOX_TOKEN;

    const map = new this.mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 3.5,
      center: [27, 53],
    });

    covidData.Countries.forEach((country) => {
      console.log(country);
      // create the popup
      const popup = new this.mapboxgl.Popup({ offset: 25 }).setHTML(
        `<p>Country: ${country.Country}</p>
        <p>Confirmed: ${country.TotalConfirmed}</p>
        <p>Deaths: ${country.TotalDeaths}</p>
        <p>Recovered: ${country.TotalRecovered}</p>`
      );

      const el = document.createElement('div');
      el.id = 'marker';

      const markerOptions = {
        element: el,
        color: 'red',
        scale: 1,
      };

      new this.mapboxgl.Marker(markerOptions)
        .setLngLat([+country.latlng[1], +country.latlng[0]])
        .setPopup(popup)
        .addTo(map);
    });

    // fetch('./coordinates.json')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     data.forEach((point) => {
    //       console.log(point);

    //       const popup = new this.mapboxgl.Popup({ offset: 25 }).setHTML(
    //         `<p>Confirmed: ${point.Confirmed}</p>
    //          <p>Deaths: ${point.Deaths}</p>
    //          <p>Recovered: ${point.Recovered}</p>`
    //       );

    //       const el = document.createElement('div');
    //       el.id = 'marker';

    //       const markerOptions = {
    //         element: el,
    //         color: 'red',
    //         scale: 3,
    //       };

    //       new this.mapboxgl.Marker(markerOptions)
    //         .setLngLat([+point.Lon, +point.Lat])
    //         .setPopup(popup)
    //         .addTo(map);
    //     });
    //   });
  }
}
