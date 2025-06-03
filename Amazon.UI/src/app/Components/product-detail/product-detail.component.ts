import { Component, inject } from '@angular/core';
import { ProductService } from '../../Services/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { IGetById } from '../../Models/GetById.Model';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { CarouselModule } from 'primeng/carousel';
import { UserCartService } from '../../Services/user-cart.service';
import { ICart } from '../../Models/Cart.Model';
import { UserService } from '../../Services/user-service.service';
import { jwtDecode } from 'jwt-decode';
import { error } from 'console';

@Component({
  selector: 'app-product-detail',
  imports: [FormsModule,
            MatCardModule,
            MatListModule,
            CommonModule,
            MatIconModule,
            MatChipsModule,
            MatButtonModule,
            CarouselModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  productService = inject(ProductService)
  activatedRoute = inject(ActivatedRoute)
  userCartService = inject(UserCartService)
  userService = inject(UserService)

  productId : IGetById | any = {}
  product :  any = {}
  cart : ICart | any = {}

  token : any = this.userService.getToken()
  decoded : any = jwtDecode(this.token)

  ngOnInit() : void{
    this.productId.productId = this.activatedRoute.snapshot.paramMap.get('productId')
    this.productService.getProductById(this.productId).subscribe((res: any) =>{
      this.product = res.productDetails
      console.log(res)
    })
  }

  addToCart(id : number){
    this.cart.productId = id
    this.cart.cartId = this.decoded.UserId
    this.userCartService.addToCart(this.cart).subscribe((res : any) =>{
      console.log(res)
    })
  }
}

