import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  public countries: Country[]=[]
  constructor(
    private countryService: CountriesService)
    {

  }
  searchByRegion(value: string): void{
    this.countryService.search(value,'region').subscribe((res: Country[])=>{
      this.countries = res;
    })
  }
}
