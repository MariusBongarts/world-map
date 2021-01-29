import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CountryInfoComponent } from './components/country-info/country-info.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';


@NgModule({
  declarations: [DashboardComponent, CountryInfoComponent, DashboardHeaderComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
})
export class DashboardModule { }
