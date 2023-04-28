import { Component, OnInit ,Injectable} from '@angular/core';
import { WeatherDataService } from './weather-data.service';
import { CurrentWeatherData, ThreeHourForecast } from './weather.interface';
import { GeolocationService } from '../Services/geolocation.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers:[GeolocationService]
})

@Injectable({
  providedIn: 'root'
})

export class WeatherComponent implements OnInit {
  currentWeather: any = [];
  threeHourForecast: any = [];
  dailyForecast: any = [];
  location:any
  locationJs:any
  error:any
  

  constructor(
    private weatherDataService: WeatherDataService,

    private geolocationService: GeolocationService
    ) { }

  ngOnInit() {
    // Get latitude and longitude from GeolocationComponent
    this.geolocationService.getCurrentPosition().subscribe(
      (position)=>{
        console.log(position);
        this.locationJs=position.coords
      },
      (error)=>{this.error=error}
     )
 

   this.geolocationService.getLocation_IPadd().subscribe((response)=>{
    console.log(response);
    this.location=response;
   })

    
    // Fetch weather data from the weather data service
    this.weatherDataService.getWeatherData().subscribe(
        (data) => {this.currentWeather = data;
        console.log(this.currentWeather)},

        (error) => {console.error('Failed to fetch current weather data:', error);}
          );

          // Fetch three hour forecast data with user's position
    this.weatherDataService.getThreeHourForecast().subscribe(
      (data) => {this.threeHourForecast = data;
      console.log(this.threeHourForecast)},
      (error) => {console.error('Failed to fetch Three Hour forecast data:', error);}
          );
        }
    
  getWeatherIconUrl(iconCode: string): string {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  }
}
