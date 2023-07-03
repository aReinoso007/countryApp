import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';
@Injectable({providedIn: 'root'})
export class CountriesService {

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries:[]},
    byCountry: {term:'', countries:[]},
    byRegion: {region:'', countries:[]},
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  search(term: string, type: string): Observable<Country[]>{
    return this.http.get<Country[]>(`${environment.apiURL}/${type}/${term}`)
    .pipe(
      tap( countries=> {
        if(type === 'capital') this.cacheStore.byCapital= {term, countries}
        if(type ==='name') this.cacheStore.byCountry= {term, countries}
        if(type === 'region') this.cacheStore.byRegion={region: term as Region, countries}
      }),
      tap(
        ()=> this.saveToLocalStorage()
      ),
      catchError(() => of([]) ),
    );
  }

  searchByCode(term: string): Observable<Country | null>{
    return this.http.get<Country[]>(`${environment.apiURL}/alpha/${term}`)
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError(error => of(null)));
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)

  }
}
