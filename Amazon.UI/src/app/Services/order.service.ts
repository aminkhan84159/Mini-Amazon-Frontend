import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrder } from '../Models/Order.Model';
import { IGetOrder } from '../Models/GetOrderById.Model';
import { IGetUser } from '../Models/GetUser.Model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  mainApi = 'https://mini-amazon-backend-iu4n.onrender.com/api/';
  http = inject(HttpClient);

  public addOrder(order : IOrder){
    return this.http.post(`${this.mainApi}Order/Add`, order)
  }

  public getOrderByUserId(user : IGetUser){
    return this.http.post(`${this.mainApi}Order/GetById`,user)
  }
}
