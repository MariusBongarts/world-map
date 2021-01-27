import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import 'mapbox-gl-leaflet';
import { LeafletMapService } from './services/leaflet-map.service';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit {

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private leafletMapService: LeafletMapService) { }

  public ngAfterViewInit(): void {
    this.leafletMapService.initMap(this.mapContainer);
  }

}
