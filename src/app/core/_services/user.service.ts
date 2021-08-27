import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private subject = new ReplaySubject<any>();
  constructor(private http: HttpClient) { }



  users(mode, data = null) {
    let URL = `${environment.apiUrl}/user/admin`
    if (mode === 'GET') {
      URL = `${URL}?type=${data}`
    }
    return this.http.request<any>(mode, URL, { body: data })
  }


  details(mode, data = null) {
    let URL = `${environment.apiUrl}/user`
    return this.http.request<any>(mode, URL, { body: data })
  }

  changePassword(data) {
    let URL = `${environment.apiUrl}/user/change-passsword`
    return this.http.put<any>(URL, data)
  }


  sendUser(message: string) {
    this.subject.next(message);
  }

  profile_pic(image) {
    let URL = `${environment.apiUrl}/user/picture`
    return this.http.post<any>(URL, image)
  }

  getUser(): Observable<any> {
    return this.subject.asObservable();
  }

  account(mode, data = null) {
    let URL = `${environment.apiUrl}/user/account`
    if (mode === 'GET') {
      URL = `${URL}?id=${data}`
    }
    return this.http.request<any>(mode, URL, { body: data })
  }

  activity(id, format) {
    let URL = `${environment.apiUrl}/user/activity?id=${id}&format=${format}`
    if(format === 'csv') {
      return this.http.get(URL, {responseType:'arraybuffer'})
    } else {
      return this.http.get<any>(URL)
    }

    
  }

}
