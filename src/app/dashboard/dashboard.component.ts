import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { LeafletEventService } from '../leaflet-map/services/leaflet-event.service';
import { Country } from '../public-interfaces';
import { HandleUnsubscribeDirective } from '../shared/directives/handle-unsubscribe.directive';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends HandleUnsubscribeDirective implements OnInit  {
  hoveredCountry$!: Observable<Country>;


  constructor(public authService: AuthService, private leafletEventService: LeafletEventService) {
    super();
   }

  ngOnInit(): void {
    this.hoveredCountry$ = this.leafletEventService.subscribe('mouseoverLayer').pipe(map(event => event.data.feature.properties));
  }

}
