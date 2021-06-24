/**
 * Model class for weather api
 * Here 'internal parameter is internal parameter return by open weather api
 * which is not required to use in display and so its made optional
 *
 * @export
 * @class WeatherResponse
 */
export class WeatherResponse {
  cod?: string; // internal parameter
  message?: string;
  cnt: number;
  list: WeatherList[];
  city: ICityInfo;

  /**
   * Currently not required as data is coming in the required format only
   * if we want to some data modification then we can do it over here
   *
   * @param {any[]} responseData
   * @return {*}  {WeatherResponse}
   * @memberof WeatherResponse
   */
  fromJSON(responseData: any): WeatherResponse {
    return responseData as WeatherResponse;
  }
}

interface WeatherList {
  dt: number;
  main: IMainInfo;
  weather: WeatherDetails[];
  clouds: any;
  wind: IWindInfo;
  visibility: number;
  pop: number;
  sys: any;
  dt_txt: string;
}

interface IWindInfo {
  speed: number;
  deg: number;
  gust: number;
}

interface IMainInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface WeatherDetails {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface ICityInfo {
  id: number;
  name: string;
  coord: ICoordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface ICoordinates {
  lat: number;
  lon: number;
}
