import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';
@Injectable({providedIn: 'root'})
export class CountriesService {

  constructor(private http: HttpClient) { }

  searchByCapital(capital: string): Observable<Country[]>{
    return this.http.get<Country[]>(`${environment.apiURL}/capital/${capital}`)
    .pipe( catchError(error => of([])));
  }

  searchByCountry(capital: string): Observable<Country[]>{
    return this.http.get<Country[]>(`${environment.apiURL}/name/${capital}`)
    .pipe( catchError(error => of([])));
  }

  searchByRegion(capital: string): Observable<Country[]>{
    return this.http.get<Country[]>(`${environment.apiURL}/region/${capital}`)
    .pipe( catchError(error => of([])));
  }
}
