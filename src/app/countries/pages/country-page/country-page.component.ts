import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

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
    this.route.params.subscribe(({id}) =>{
      console.log({params: id})
    })
  }

  searchByCode(code: string): void{
    this.countryService.searchByCode(code).subscribe((country: Country)=>{
      console.log({country})
    })
  }

}
