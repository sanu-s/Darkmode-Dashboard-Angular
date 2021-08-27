import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }


  project(mode, data = null) {
    let URL = `${environment.apiUrl}/project`
    if (mode === 'GET') {
      URL = `${URL}?id=${data}`
    }
    return this.http.request<any>(mode, URL, { body: data })
  }

  list() {
    let URL = `${environment.apiUrl}/project/list`
    return this.http.request<any>('GET', URL)
  }

  chart(id, feature){
    let URL = `${environment.apiUrl}/project/chart?id=${id}&feature=${feature}`
    return this.http.request<any>('GET', URL)
  }
    
}

