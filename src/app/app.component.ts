import { Component, OnInit } from '@angular/core';
import {ThemeService} from './core/_services'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkTheme;

  constructor(private themeService: ThemeService) { 
    this.themeService.isDarkTheme.subscribe(x=>{
      this.isDarkTheme = x
    })
  }
   

  ngOnInit() {
    if(localStorage.getItem('mode')=='dark') {
      this.isDarkTheme = true
      this.themeService.setDarkTheme(true)
    }

  }
}
