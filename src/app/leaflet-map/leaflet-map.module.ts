import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from './leaflet-map.component';
import { LeafletMapRoutingModule } from './leaflet-map-routing.module';



@NgModule({
  declarations: [LeafletMapComponent],
  imports: [
    CommonModule,
    LeafletMapRoutingModule
  ],
  exports: [LeafletMapComponent]
})
export class LeafletMapModule { }
