import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  public country?: Country;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountriesService
  ){

  }
  ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap(({id}) =>this.countryService.searchByCode(id)),
    )
    .subscribe( (res) =>{
      if(!res )  return this.router.navigateByUrl('countries')
      console.log({res})
      return this.country = res;
    })
  }
}
