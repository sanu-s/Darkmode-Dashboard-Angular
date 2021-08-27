import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../../core/_models';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router:Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public setcurrentUserValue(value:User) {
        this.currentUserSubject.next(value)
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/user/login`, { email, password })
            .pipe(map(user => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                // user.authdata = window.btoa(email + ':' + password);
                localStorage.setItem('currentUser', JSON.stringify(user))
                this.currentUserSubject.next(user);
                location.reload();
                return user;
            }));
    }

  logout() {
        // remove user from local storage to log user out
        let URL = `${environment.apiUrl}/user/logout`        
        // this.currentUserSubject.next(null);
        // this.router.navigate(['/'])
        // localStorage.removeItem('currentUser');
        return this.http.post<any>(URL,{})
    }

    removeUser(){
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
        this.router.navigate(['/'])
    }

    refreshToken(user){
        if(user) {
        user.access_token = user.refresh_token
        this.currentUserSubject.next(user)
        return this.http.post<any>(`${environment.apiUrl}/user/refresh`, {})
        }
    }

    resetPassword(mode, data=null){
        let URL = `${environment.apiUrl}/user/reset-password`
        return this.http.request<any>(mode,URL,{body:data})
    }

    quote(){
        let URL = `${environment.apiUrl}/quote`
        return this.http.request<any>('GET',URL)
    }
}