import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';
@Injectable({providedIn: 'root'})
export class CountriesService {

  constructor(private http: HttpClient) { }

  search(value: string, type: string): Observable<Country[]>{
    return this.http.get<Country[]>(`${environment.apiURL}/${type}/${value}`)
    .pipe(
      catchError(() => of([]) ),
    );
  }

  searchByCode(value: string): Observable<Country | null>{
    return this.http.get<Country[]>(`${environment.apiURL}/alpha/${value}`)
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError(error => of(null)));
  }
}
