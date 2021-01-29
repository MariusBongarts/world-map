import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { combineLatest, merge } from 'rxjs';
import { LeafletEventService } from '../../leaflet-map/services/leaflet-event.service';
import { MobileHelper } from '../helper/MobileHelper';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  public matDrawer!: MatDrawer;

  constructor(private leafletEventService: LeafletEventService) { }

  public init(drawerRef: MatDrawer) {
    this.matDrawer = drawerRef;

    /** Open the drawer when user clicks on layer */
    this.leafletEventService.subscribe('clickLayer').subscribe(event => {
      if (!this.matDrawer.opened) {
        this.matDrawer.open();
      }
    });

    /** Close drawer when countries are added or removed and device is mobile */
    merge(this.leafletEventService.subscribe('countryRemoved'), this.leafletEventService.subscribe('countryAdded'))
      .subscribe(event => {
        if (this.matDrawer.opened && MobileHelper.isMobile) {
          this.matDrawer.close();
        }
      });
  }

}
