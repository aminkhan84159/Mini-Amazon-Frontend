import { Component, inject } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { UserService } from '../../Services/user-service.service';
import { jwtDecode } from 'jwt-decode';
import { IGetOrder } from '../../Models/GetOrderById.Model';
import { IGetUser } from '../../Models/GetUser.Model';

@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  orderService = inject(OrderService)
  userService = inject(UserService)

  user : IGetUser | any = []
  products : any = []

  token : any = this.userService.getToken()
  decoded : any = jwtDecode(this.token)

  ngOnInit(): void{
    this.user.userId = this.decoded.UserId

    this.orderService.getOrderByUserId(this.user).subscribe((res : any) =>{
      console.log(res)
    })
  }
}
