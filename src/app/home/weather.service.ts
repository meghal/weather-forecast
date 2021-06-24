import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { WeatherResponse } from './weather.model';

const routes = {
  weatherRoute: (weather: Weather) => environment.serverUrl + `q=${weather.cityName}`,
};

export interface Weather {
  // The quote's category: 'dev', 'explicit'...
  cityName: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getWeatherByCityName(weather: Weather): Observable<{ error: string } | WeatherResponse> {
    return this.httpClient.get(routes.weatherRoute(weather)).pipe(
      map((body: any) => new WeatherResponse().fromJSON(body)),
      catchError(() => throwError({ error: 'Error, Please connect support team' }))
    );
  }
}
