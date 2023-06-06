import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private countryService: CountriesService
  ){

  }
  ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap(({id}) =>this.countryService.searchByCode(id)),
    )
    .subscribe( (res) =>{
      console.log({res})
    })
  }
}
