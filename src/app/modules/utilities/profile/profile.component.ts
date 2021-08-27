import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {UserService} from '../../../core/_services/user.service'
import {AuthenticationService} from '../../../core/_services'
import { DomSanitizer } from '@angular/platform-browser';
import { admin_config } from '../../../core/_config'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit, AfterViewInit {
  profileForm: FormGroup
  passwordForm: FormGroup
  name;
  user;
  favoriteReason: string;
  other_reason:string;
  reasons = admin_config.reasons

  @ViewChild('target1') homeElement: ElementRef;
  @ViewChild('target2') conElement: ElementRef;
  @ViewChild('target3') newElement: ElementRef;
  

  public currentActive = 1;
  public homeOffset: Number = null;
  public conOffset: Number = null;
  public newOffset: Number = null;



  constructor(private userService:UserService, public fb: FormBuilder, private sanitizer: DomSanitizer, private authservice:AuthenticationService) { 
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [''],
    })
    this.passwordForm = this.fb.group({
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      passwordold: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(data=>{
      this.user = data;
      this.name = data.name
      this.profileForm.controls.name.setValue(data.name)
      this.profileForm.controls.email.setValue(data.email)
      this.profileForm.controls.email.disable()
    })

  }


  ngAfterViewInit() {
    this.homeOffset = this.homeElement.nativeElement.offsetTop - 50;
    this.conOffset = this.conElement.nativeElement.offsetTop - 50;
    this.newOffset = this.newElement.nativeElement.offsetTop - 100;
  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    this.homeOffset = this.homeElement.nativeElement.offsetTop - 50;
    this.conOffset = this.conElement.nativeElement.offsetTop - 50;
    this.newOffset = this.newElement.nativeElement.offsetTop - 100;
    console.log(window.pageYOffset, this.conOffset, this.newOffset)
    if (window.pageYOffset >= this.homeOffset && window.pageYOffset < this.conOffset) {
      this.currentActive = 1;
    } else if (window.pageYOffset >= this.conOffset && window.pageYOffset < this.newOffset) {
      this.currentActive = 2;

     } else if (window.pageYOffset >= this.newOffset) {
      this.currentActive = 3;
    } else {
      this.currentActive = 0;
    }
  }
updateProfile() {
  if(this.name !== this.profileForm.controls.name.value.trim()){
  this.userService.details('PUT', {name:this.profileForm.controls.name.value}).subscribe(data=>{
    this.profileForm.controls.name.setValue(data.name)
    this.profileForm.controls.email.setValue(this.user.email)
    this.profileForm.controls.email.disable()
  
    for(let key in data) {
      console.log(key)
      this.user[key] = data[key]
    }
    this.userService.sendUser(this.user)
  })
}
}

updatePassword() {
  this.userService.changePassword(this.passwordForm.value).subscribe(data=>{
    this.passwordForm.controls.password1.setValue('')
    this.passwordForm.controls.password2.setValue('')
    this.passwordForm.controls.passwordold.setValue('')
  })
}

onSelectFile(event) {
    const formData: FormData = new FormData();

    formData.append('file', event[0], event.name);
    this.userService.profile_pic(formData).subscribe((x)=>{
      this.user.icon = x.detail;
      // this.userService.sendUser(this.user)
    })
   
 }


getSantizeUrl(url : string) {
  return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,${url}`);
}

deleteAcc() {
  if(this.favoriteReason === "Other, please explain further:") {
    this.favoriteReason = this.other_reason
  }
  this.userService.details('DELETE', {reason:this.favoriteReason}).subscribe(()=>{
    this.authservice.logout().subscribe(()=>{
      localStorage.removeItem('currentUser');
    });
  })
}


scroll(el, i) {
  console.log(el)
    el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest"});
}

}

