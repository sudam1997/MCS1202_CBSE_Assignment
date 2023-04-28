import { Component } from '@angular/core';
import { fadeInOutAnimation } from './animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInOutAnimation],
  
})
export class AppComponent {
  title = 'weather-app';
  
}

