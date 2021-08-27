import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs'
import {UserService, AuthenticationService, ThemeService} from '../../../core/_services'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router'
import { OverlayContainer} from '@angular/cdk/overlay';


import {} from '../../../core/_services'

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit, AfterViewInit {
  user
  isDarkTheme = false;
  currentUrl;
  link = '/'
  dropdownValues = [
    { value: 'Profile' },
    { value: 'Subscription' },
    { value: 'Logout' }
  ]
  constructor(public overlayContainer: OverlayContainer, private theme:ThemeService, private router:Router, private userservice:UserService, private authService:AuthenticationService, public sanitizer:DomSanitizer) {
    this.userservice.getUser().subscribe(data=>{
      this.user = data
    })
  }

  @HostBinding('class') componentCssClass;
  ngOnInit(){
    // this.theme.isDarkTheme.subscribe(x=>x=this.isDarkTheme)
    this.router.events.subscribe((val) => {
      if(this.router.url === '/admin') {
        this.link = '/admin'
      } if(this.router.url === '/projects') {
        this.link = '/projects'
      }
 });

    
    if(this.authService.currentUserValue && !this.user) {
    this.userservice.details('GET').subscribe(data=>{
      this.user = data
      this.userservice.sendUser(data)
    })
  }
  }

  ngAfterViewInit(){
    if(localStorage.getItem('mode')=='dark'){
      this.isDarkTheme = true
      this.overlayContainer.getContainerElement().classList.add("dark-theme");
    }
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,${url}`);
}



toggleDarkTheme(checked: boolean) {
  if(checked == false){
    this.overlayContainer.getContainerElement().classList.remove("dark-theme");
    this.theme.setDarkTheme(checked);
    localStorage.setItem('mode','light')
  } else {
    this.overlayContainer.getContainerElement().classList.add("dark-theme");
    this.theme.setDarkTheme(checked);
    localStorage.setItem('mode','dark')
  }
  // this.componentCssClass = theme;
}

  backClicked() {
      // this._location.back();
      this.router.navigate([this.link])
  }
 logout(){
  this.authService.logout().subscribe(()=>{
    this.userservice.sendUser('')
    this.authService.removeUser()
  });
 }
}
