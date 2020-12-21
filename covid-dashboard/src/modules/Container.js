import { Table } from './Table';
import List from './List';
import Map from './Map';

export default class Container {
  constructor(result) {
    const {
      covidData,
      // covidDataPerYear
    } = result;
    this.covidData = covidData;
    this.map = new Map(covidData);
    this.table = new Table(covidData);
    this.list = new List(covidData);
  }

  init() {
    this.map.init().eventHandler(this);
    this.table.init().eventHandler(this);
    this.list.init().eventHandler(this);
  }
}
