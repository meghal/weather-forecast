import { Component, OnInit } from '@angular/core';

import { WeatherResponse } from './weather.model';
import { Weather, WeatherService } from './weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  weatherInfo: WeatherResponse = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeatherByCityName();
  }

  private getWeatherByCityName() {
    const request: Weather = {
      cityName: 'London',
    };
    this.weatherService.getWeatherByCityName(request).subscribe(
      (response: WeatherResponse) => {
        if (response) {
          this.weatherInfo = response;
        }
      },
      (error) => {
        console.log(error.text);
      }
    );
  }
}
