import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component';

const routes: Routes = [
  {
    path: '',
    component: LeafletMapComponent,
    outlet: 'leaflet-map'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeafletMapRoutingModule { }
