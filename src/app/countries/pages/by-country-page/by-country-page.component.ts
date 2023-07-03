import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent  implements OnInit{

  public countries: Country[]=[]
  public initialValue = '';
  constructor(
    private countryService: CountriesService)
    {

  }
  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountry.countries!
    this.initialValue =(this.countryService.cacheStore.byCountry.term ? this.countryService.cacheStore.byCountry.term : '')
  }

  searchByCountry(value: string): void{
    this.countryService.search(value,'name').subscribe((res: Country[])=>{
      this.countries = res;
    })
  }

}
