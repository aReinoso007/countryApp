import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[]=[]
  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania']
  public selectedRegion?: Region;
  public term: string = '';
  constructor(
    private countryService: CountriesService)
    {

  }
  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries!;
    this.selectedRegion = (this.countryService.cacheStore.byRegion.region ? this.countryService.cacheStore.byRegion.region : '')
  }
  searchByRegion(value: Region): void{
    this.selectedRegion = value;
    this.countryService.search(value,'region').subscribe((res: Country[])=>{
      this.countries = res;
    })
  }
}
