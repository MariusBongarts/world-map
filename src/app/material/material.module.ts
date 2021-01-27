import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatSidenavModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MaterialModule { }
