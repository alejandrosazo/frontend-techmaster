import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RequestOptions, Request, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(protected http: HttpClient) {

   }
   
    getUsers(users, password) {
      return this.http.get('https://backend-techmaster.azurewebsites.net/api/User/LoginUser?UserName='+users+'&Password='+password, { responseType: 'json' });
    }
}
