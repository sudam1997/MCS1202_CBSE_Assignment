import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GeolocationService } from '../Services/geolocation.service'; 

@Injectable({
  providedIn: 'root'
})

class Location{
  location: any;
  error: any;
  private locationSubject: Subject<any> = new Subject<any>();

  constructor(private geolocationService: GeolocationService) {
    this.initLocation();
  }

  private initLocation() {
    this.geolocationService.getCurrentPosition().subscribe(
      (position) => {
        console.log(position);
        this.location = position.coords;
        this.locationSubject.next(this.location);
      },
      (error) => {
        if (error) {
          this.error = error;
          this.geolocationService.getLocation_IPadd().subscribe((response) => {
            console.log(response);
            this.location = response;
            this.locationSubject.next(this.location);
          })
        }
      }
    )
  }

  getLocation(): Observable<any> {
    return this.locationSubject.asObservable();
  }
}


@Injectable({
  providedIn: 'root'
})


export class WeatherDataService   {
  private apiUrl = 'http://localhost:5000/api'
  location:any;


  // Replace with your OpenWeatherMap API key

constructor(
    private http: HttpClient,
    private locationService: Location
    ) { }



getWeatherData(): Observable<any> {
  return this.locationService.getLocation().pipe(
    switchMap((location) => {
      const lat = location.latitude;
      const lon = location.longitude;
      const url = `${this.apiUrl}/current-weather?lat=${lat}&lon=${lon}`;
      return this.http.get(url);
    })
  );
}

getThreeHourForecast(): Observable<any> {
  return this.locationService.getLocation().pipe(
    switchMap((location) => {
      const lat = location.latitude;
      const lon = location.longitude;
      const url = `${this.apiUrl}/3hour-forecast?lat=${lat}&lon=${lon}`;
      return this.http.get(url);
    })
  );
}
}
