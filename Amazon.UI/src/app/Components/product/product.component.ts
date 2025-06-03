import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IProduct } from '../../Models/Product.Model';
import { ProductService } from '../../Services/product-service.service';
import { IFilter } from '../../Models/Filter.Model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { CarouselModule } from 'primeng/carousel';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { IImage } from '../../Models/Image.Model';
import { UserService } from '../../Services/user-service.service';
import { UserCartService } from '../../Services/user-cart.service';
import { jwtDecode } from 'jwt-decode';
import { ICart } from '../../Models/Cart.Model';
import { Router } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatButtonModule,
            MatSelectModule,
            FormsModule,
            CommonModule,
            MatDialogModule,
            CarouselModule,
            MatCardModule,
            MatDividerModule,
            MatChipsModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  products : IProduct | any = []
  cart : ICart  | any = {}
  
  productService = inject(ProductService)
  userService = inject(UserService)
  userCartService = inject(UserCartService)
  router = inject(Router);

  filter : IFilter | any = {}
  readonly dialog = inject(MatDialog)

  token : any = this.userService.getToken();
  decoded : any = jwtDecode(this.token);

  searchText: string = ''
  currencyType: string = 'USD'
  cartProductIds: Set<number> = new Set<number>();

  addProduct(id : number | null){
    const dialogRef = this.dialog.open(AddProductComponent,{
      width : '1900px',
      data : {Id : id}
    })
  }

  ngOnInit() : void{
    this.productService.getProducts().subscribe((res : any) => {
      this.products = res.products
      console.log(res.products)
    })
  }

  filterProducts(searchText : string){
    if(searchText == '') {
      this.productService.getProducts().subscribe((res: any) => {
        this.products = res.products;
      });
    }else{
      this.filter.search = searchText
      this.productService.getFilteredProducts(this.filter).subscribe((res: any) => {
        this.products = res.products;
      });
   }
  }

  options = [
    { name: "USD", currencyRate: 1 },
    { name: "INR", currencyRate: 84.32 },
    { name: "PND", currencyRate: 0.75 },
  ]

  convertWithCurrencyRate(value: number, currency: string){
    let currencyRate = this.options.find(x => x.name === currency)?.currencyRate;
    if (currencyRate)
      return value * currencyRate;
    
    return value;
  }

  getCurrencySymbol(currency: string): string {
  switch (currency) {
    case 'USD': return '$';
    case 'INR': return '₹';
    case 'PND': return '£';
    default: return '';
    }
  }

  addToCart(id: number){
    this.cart.productId = id;
    this.cart.cartId = this.decoded.UserId;
    this.cartProductIds.add(id);

    this.userCartService.addToCart(this.cart).subscribe((res: any) => {
      console.log(res);
    }, (error: any) => {
      console.error('Error adding product to cart:', error);
    });
  }

  removeFromCart(id: number){
    this.cart.productId = id;
    this.cart.cartId = this.decoded.UserId;
    this.cartProductIds.delete(id);

    this.userCartService.removeFromCart(this.cart).subscribe((res: any) => {
      console.log(res);
    }, (error: any) => {
      console.error('Error removing product from cart:', error);
    });
  }

  isInCart(id: number): boolean {
    return this.cartProductIds.has(id);
  }

  viewProduct(productId : number){
    this.router.navigate([`productDetail/${productId}`]);
  }
}
