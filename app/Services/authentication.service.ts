import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   headers = new HttpHeaders();
  constructor(private http: HttpClient) {}

 
  checkAuthentication(){
    var localstorage = localStorage.getItem('token');
    if(localstorage == null){
      return 410; // unauthorized
    }
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    var localstorage = localStorage.getItem('token');
    if(localstorage != null){
      this.headers = new HttpHeaders({
        'Authorization': 'apiKey ' + localstorage
      })
    }
  }

  get(url : any) {
    this.createAuthorizationHeader(this.headers);
    return this.http.get(url, {
      headers: this.headers
    });
  }

  post(url, data) {
    this.createAuthorizationHeader(this.headers);
    return this.http.post(url, data, {
      headers: this.headers
    });
  }

  put(url, data) {
    this.createAuthorizationHeader(this.headers);
    return this.http.put(url, data, {
      headers: this.headers
    });
  }

  delete(url) {
    this.createAuthorizationHeader(this.headers);
    return this.http.delete(url, {
      headers: this.headers
    });
  }
}
