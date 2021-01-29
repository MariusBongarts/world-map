import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HandleUnsubscribeDirective } from './directives/handle-unsubscribe.directive';


@NgModule({
  declarations: [HandleUnsubscribeDirective],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule
  ]
})
export class SharedModule { }
