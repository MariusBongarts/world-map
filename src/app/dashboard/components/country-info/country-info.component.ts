import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../../public-interfaces';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss']
})
export class CountryInfoComponent implements OnInit {
  @Input() country!: Country | null;

  constructor() { }

  ngOnInit(): void {
  }

}
