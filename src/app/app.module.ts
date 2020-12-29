import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseModule } from './firebase/firebase.module';
import { LeafletMapModule } from './leaflet-map/leaflet-map.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirebaseModule,
    LeafletMapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
