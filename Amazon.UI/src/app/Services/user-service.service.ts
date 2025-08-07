import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILogin } from '../Models/Login.Model';
import { ISignUp } from '../Models/SignUp.Model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IGetUser } from '../Models/GetUser.Model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mainApi = 'https://mini-amazon-backend-iu4n.onrender.com/';
  http = inject(HttpClient);

  constructor() {
    const token = this.getToken();
    if (token) {
      this.isLoggedIn.next(true);
    }
  }

  public login(loginInfo : ILogin){
    return this.http.post(`${this.mainApi}User/Login`, loginInfo);
  }

  public signup(signup: ISignUp){
    return this.http.post(`${this.mainApi}User/Add`,signup)
  }

  public getUser(){
    return this.http.get(`${this.mainApi}User`)
  }
  
  public getUserById(userId : IGetUser){
    return this.http.post(`${this.mainApi}User/GetById`, userId)
  }

  setToken(token:string){
    localStorage.setItem('token',token);
    this.isLoggedIn.next(true);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }
  
  removeToken(){
    localStorage.setItem('token',"");
    this.isLoggedIn.next(false);
  }
  
  public isLoggedIn = new BehaviorSubject<boolean>(false);

    get isLoggedIn$(): Observable<boolean>{
      return this.isLoggedIn.asObservable();
    }
}
