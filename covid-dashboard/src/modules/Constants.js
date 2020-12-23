/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
export const MAPBOX_TOKEN =
  'pk.eyJ1IjoibWljaGFlbHNoIiwiYSI6ImNraXFkdnZ0ajF0bm4ycmxiM3k0MXRvcjMifQ.Yf1Olmco7KyZFm-rRvcPaw';

export const COUNTRIES_COORDINATS_URL =
  'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;latlng;population;flag';

// export const COVID_DATA_PER_YEAR_URL = 'https://disease.sh/v3/covid-19/historical?lastdays=365';
// export const COVID_DATA_PER_YEAR_URL = 'https://disease.sh/v3/covid-19/historical/all?lastdays=365';

export const COVID_DATA_URL = 'https://api.covid19api.com/summary';
export const CASES_RANGE = [5000000, 1000000, 500000, 400000, 250000, 100000, 50000];
export const DEATHS_RANGE = [100000, 50000, 25000, 10000, 5000, 2500, 1000];
export const RECOVERED_RANGE = [5000000, 1000000, 500000, 400000, 250000, 100000, 50000];
export const MARKER_SIZE = [25, 15, 13, 11, 9, 7, 5];

export const TYPE_CASE = 0;
export const TYPE_DEATH = 1;
export const TYPE_RECOVERED = 2;
export const TYPE_NAMES = ['Confirmed cases', 'Deaths', 'Recovered'];
export const MAP_TAB_BUTTONS_ID = [
  '#map-button-cases',
  '#map-button-deaths',
  '#map-button-recovered',
];
export const CONTAINER_CLASSES = [
  'table1-container',
  'table2-container',
  'map-container',
  // 'graph-container',
];

const BUTTON_CONFIRMED_ID = 'tab-confirmed';
const BUTTON_DEATHS_ID = 'tab-deaths';
const BUTTON_RECOVERED_ID = 'tab-recovered';
const BUTTON_TOTAL_ID = 'tab-total';
const BUTTON_TOTAL100K_ID = 'tab-total100K';
const BUTTON_NEW_ID = 'tab-new';
const BUTTON_NEW100K_ID = 'tab-new100K';

export const BUTTONS_ID = {
  BUTTON_CONFIRMED_ID,
  BUTTON_DEATHS_ID,
  BUTTON_RECOVERED_ID,
  BUTTON_TOTAL_ID,
  BUTTON_TOTAL100K_ID,
  BUTTON_NEW_ID,
  BUTTON_NEW100K_ID,
};

export const TABLE_COUNTRY_STATES = {
  TotalConfirmed: {
    title: 'TotalConfirmed',
    buttonId: BUTTON_CONFIRMED_ID,
  },
  TotalDeaths: {
    title: 'TotalDeaths',
    buttonId: BUTTON_DEATHS_ID,
  },
  TotalRecovered: {
    title: 'TotalRecovered',
    buttonId: BUTTON_RECOVERED_ID,
  },
};

export const TABLE_DETAIL_STATES = {
  Total: {
    title: 'Total',
    buttonId: BUTTON_TOTAL_ID,
  },
  TotalPer100K: {
    title: 'TotalPer100K',
    buttonId: BUTTON_TOTAL100K_ID,
  },
  New: {
    title: 'New',
    buttonId: BUTTON_NEW_ID,
  },
  NewPer100K: {
    title: 'NewPer100K',
    buttonId: BUTTON_NEW100K_ID,
  },
};

export const TABLE_STATES = {
  TABLE_COUNTRY_STATES,
  TABLE_DETAIL_STATES,
};

export const LIST_STATES = {
  TotalConfirmed: {
    inList: 'TotalConfirmed',
    inDetailTable: TABLE_DETAIL_STATES.Total,
    inCountryTable: TABLE_COUNTRY_STATES.TotalConfirmed,
    buttonId: BUTTON_CONFIRMED_ID,
    mapType: TYPE_CASE,
  },
  TotalDeaths: {
    inList: 'TotalDeaths',
    inTable: TABLE_DETAIL_STATES.Total,
    inCountryTable: TABLE_COUNTRY_STATES.TotalDeaths,
    buttonId: BUTTON_DEATHS_ID,
    mapType: TYPE_DEATH,
  },
  TotalRecovered: {
    inList: 'TotalRecovered',
    inTable: TABLE_DETAIL_STATES.Total,
    inCountryTable: TABLE_COUNTRY_STATES.TotalRecovered,
    buttonId: BUTTON_RECOVERED_ID,
    mapType: TYPE_RECOVERED,
  },
  TotalConfirmedPer100K: {
    inList: 'TotalConfirmedPer100K',
    inTable: TABLE_DETAIL_STATES.TotalPer100K,
    inCountryTable: false,
    buttonId: BUTTON_TOTAL100K_ID,
    mapType: TYPE_CASE,
  },
  TotalDeathsPer100K: {
    inList: 'TotalDeathsPer100K',
    inTable: TABLE_DETAIL_STATES.TotalPer100K,
    inCountryTable: false,
    buttonId: BUTTON_TOTAL100K_ID,
    mapType: TYPE_DEATH,
  },
  TotalRecoveredPer100K: {
    inList: 'TotalRecoveredPer100K',
    inTable: TABLE_DETAIL_STATES.TotalPer100K,
    inCountryTable: false,
    buttonId: BUTTON_TOTAL100K_ID,
    mapType: TYPE_RECOVERED,
  },
  NewConfirmed: {
    inList: 'NewConfirmed',
    inTable: TABLE_DETAIL_STATES.New,
    inCountryTable: false,
    buttonId: BUTTON_NEW_ID,
    mapType: TYPE_CASE,
  },
  NewDeaths: {
    inList: 'NewDeaths',
    inTable: TABLE_DETAIL_STATES.New,
    inCountryTable: false,
    buttonId: BUTTON_NEW_ID,
    mapType: TYPE_DEATH,
  },
  NewRecovered: {
    inList: 'NewRecovered',
    inTable: TABLE_DETAIL_STATES.New,
    inCountryTable: false,
    buttonId: BUTTON_NEW_ID,
    mapType: TYPE_RECOVERED,
  },
  NewConfirmedPer100K: {
    inList: 'NewConfirmedPer100K',
    inTable: TABLE_DETAIL_STATES.NewPer100K,
    inCountryTable: false,
    buttonId: BUTTON_NEW100K_ID,
    mapType: TYPE_CASE,
  },
  NewDeathsPer100K: {
    inList: 'NewDeathsPer100K',
    inTable: TABLE_DETAIL_STATES.NewPer100K,
    inCountryTable: false,
    buttonId: BUTTON_NEW100K_ID,
    mapType: TYPE_DEATH,
  },
  NewRecoveredPer100K: {
    inList: 'NewRecoveredPer100K',
    inTable: TABLE_DETAIL_STATES.NewPer100K,
    inCountryTable: false,
    buttonId: BUTTON_NEW100K_ID,
    mapType: TYPE_RECOVERED,
  },
};
