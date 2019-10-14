import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../Models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private htpService : HttpClient) { 

  }

  public Login(user : User){
   return this.htpService.post('https://localhost:44334/api/user/Login', user);
  }
}
