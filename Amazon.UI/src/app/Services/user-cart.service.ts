import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICart } from '../Models/Cart.Model';
import { IGetById } from '../Models/GetById.Model';
import { IGetCartById } from '../Models/GetCartById.Model';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {

  mainApi = 'https://mini-amazon-backend-iu4n.onrender.com/api/';
  http = inject(HttpClient);

  public addToCart(cart: ICart) {
    return this.http.post(`${this.mainApi}UserCart/Add`, cart);
  }

  public removeFromCart(cart: ICart) {
    return this.http.delete(`${this.mainApi}UserCart/Delete?cartId=${cart.cartId}&productId=${cart.productId}`);
  }

  public getCartProductsById(cartId : IGetCartById){
    return this.http.post(`${this.mainApi}Product/GetProductsByCartId`,cartId)
  }
}
