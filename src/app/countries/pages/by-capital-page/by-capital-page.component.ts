import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[]=[]
  public isLoading: boolean = false;
  public initialValue: string='';
  constructor(
    private countryService: CountriesService)
    {

  }
  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCapital.countries!
    this.initialValue =(this.countryService.cacheStore.byCapital.term ? this.countryService.cacheStore.byCapital.term : '')
  }

  searchByCapital(value: string): void{
    this.isLoading = true;
    this.countryService.search(value, 'capital').subscribe((res: Country[])=>{
      this.countries = res;
      this.isLoading = false
    })
  }

}
