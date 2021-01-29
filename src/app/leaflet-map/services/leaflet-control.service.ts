import { Injectable } from '@angular/core';
import { Country, CountryControl } from '../../public-interfaces';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class LeafletControlService {

  public info!: CountryControl;

  constructor() { }

  public addControl(map: L.Map) {
    this.addAttributionControl(map);
    // this.addInfoControl(map);
  }

  public addInfoControl(map: L.Map) {
    this.info = new L.Control();

    this.info.onAdd = (innerMap: L.Map) => {
      this.info._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.info.update();
      return this.info._div;
    };

    // method that we will use to update the control based on feature properties passed
    this.info.update = (props: Country) => {
      this.info._div.innerHTML = props ? `
      <h4>${props.name}</h4>
      <span>Not visited</span>`
        : 'Hover over a state';
    };

    this.info.addTo(map);
  }

  public addAttributionControl(map: L.Map) {
    // the attribution is required for the Geoapify Free tariff plan
    map.attributionControl
      .setPrefix('')
      .addAttribution(
        'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
      );

  }
}
