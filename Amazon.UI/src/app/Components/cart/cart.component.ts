import { Component, inject } from '@angular/core';
import { UserCartService } from '../../Services/user-cart.service';
import { UserService } from '../../Services/user-service.service';
import { jwtDecode } from 'jwt-decode';
import { IGetCartById } from '../../Models/GetCartById.Model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ICart } from '../../Models/Cart.Model';
import { OrderService } from '../../Services/order.service';
import { IOrder } from '../../Models/Order.Model';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule,
            MatButtonModule,
            MatDividerModule,
            FormsModule,
            CommonModule,
            MatIconModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  usercartService = inject(UserCartService)
  userService = inject(UserService)
  orderService = inject(OrderService)

  products :  any = []
  cartId : IGetCartById | any = {}
  cart : ICart | any = {}
  order : IOrder | any = {}

  token : any = this.userService.getToken()
  decoded : any = jwtDecode(this.token)
  

  ngOnInit(): void{
    this.cartId.cartId = this.decoded.UserId
    this.usercartService.getCartProductsById(this.cartId).subscribe((res: any) =>{
      this.products = res.products
      console.log(res)
    })
  }

  get subtotal(): number {
    return this.products.reduce((total: number, product: any) => {
      const price = product.price;
      const discount = product.productDetails.discount || 0;
      const discountedPrice = discount > 0
        ? price - (price * discount / 100)
        : price;
      return total + discountedPrice;
    }, 

    0);
  }

  get total(): number {
    return this.products.reduce((total: number, product: any) => {
      return total + product.price;
    }, 

    0);
  }

  Order(id : number){
    this.order.userId = this.decoded.UserId
    this.order.productId = id

    this.orderService.addOrder(this.order).subscribe((res : any) =>{
      console.log(res)
    })

    this.removeFromCart(id)
  }

  removeFromCart(id: number){
    this.cart.productId = id;
    this.cart.cartId = this.decoded.UserId;

    this.usercartService.removeFromCart(this.cart).subscribe((res: any) => {
      console.log(res);
    }, (error: any) => {
      console.error('Error removing product from cart:', error);
    });
  }
}
