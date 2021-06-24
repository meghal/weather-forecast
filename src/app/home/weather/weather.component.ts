import { Component, OnInit } from '@angular/core';
import { ICityInfo, WeatherList, WeatherResponse } from '../weather.model';
import { WeatherService, Weather } from '../weather.service';
import { groupBy, head, map } from 'lodash';
import * as moment from 'moment';
import { environment } from '@env/environment';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  readonly config = {
    defaultImageURL: environment.imageURL,
    imageSuffix: environment.imageSuffix,
    cityName: 'London',
  };

  isLoading = false;
  weatherInfo: { date: string; list: WeatherList[] }[];

  cityInfo: ICityInfo;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherByCityName();
  }

  private getWeatherByCityName() {
    const request: Weather = {
      cityName: this.config.cityName,
    };
    this.weatherService.getWeatherByCityName(request).subscribe(
      (response: WeatherResponse) => {
        if (response) {
          this.setWeatherInfo(response);
        }
      },
      (error) => {
        console.log(error.text);
      }
    );
  }

  private setWeatherInfo(response: WeatherResponse) {
    this.weatherInfo = map(
      groupBy(response.list, (x) => moment(x.dt_txt).format('MMM, DD YYYY')),
      (value, key) => ({
        date: moment(key).format('MMM, DD YYYY'),
        list: value,
      })
    );
    this.cityInfo = response.city;
  }
}
