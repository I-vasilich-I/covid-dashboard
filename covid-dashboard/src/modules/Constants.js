/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
export const MAPBOX_TOKEN =
  'pk.eyJ1IjoibWljaGFlbHNoIiwiYSI6ImNraXFkdnZ0ajF0bm4ycmxiM3k0MXRvcjMifQ.Yf1Olmco7KyZFm-rRvcPaw';

export const COUNTRIES_COORDINATS_URL =
  'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;latlng;population;flag';

export const COVID_DATA_URL = 'https://api.covid19api.com/summary';
export const CASES_RANGE = [5000000, 1000000, 500000, 400000, 250000, 100000, 50000];
export const DEATHS_RANGE = [100000, 50000, 25000, 10000, 5000, 2500, 1000];
export const RECOVERED_RANGE = [5000000, 1000000, 500000, 400000, 250000, 100000, 50000];
export const MARKER_SIZE = [25, 15, 13, 11, 9, 7, 5];

export const TYPE_CASE = 0;
export const TYPE_DEATH = 1;
export const TYPE_RECOVERED = 2;
export const TYPE_NAMES = ['Confirmed cases', 'Deaths', 'Recovered'];

export const BUTTONS_ID = {
  BUTTON_CONFIRMED_ID: 'tab-confirmed',
  BUTTON_DEATHS_ID: 'tab-deaths',
  BUTTON_RECOVERED_ID: 'tab-recovered',
  BUTTON_TOTAL_ID: 'tab-total',
  BUTTON_TOTAL100K_ID: 'tab-total100K',
  BUTTON_NEW_ID: 'tab-new',
  BUTTON_NEW100K_ID: 'tab-new100K',
};
