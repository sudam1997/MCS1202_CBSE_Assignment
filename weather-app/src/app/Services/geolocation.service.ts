import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeolocationService {
  
  constructor(private http:HttpClient) { }
  getLocation_IPadd(): Observable<any> {
    return this.http.get('https://ipapi.co/json');
  }


  getCurrentPosition(): Observable<any> {
    return new Observable((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: any) => {
            observer.next(position);
            observer.complete();
          },
          (error: any) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }
    
      

    }
      


   
