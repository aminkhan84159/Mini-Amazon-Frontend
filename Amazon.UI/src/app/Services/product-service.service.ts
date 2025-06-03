import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../Models/Product.Model';
import { ICategories } from '../Models/Categories.Model';
import { IGetById } from '../Models/GetById.Model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  mainApi = 'https://localhost:7175/api/';
  http = inject(HttpClient);

  public getProducts() {
    return this.http.get(`${this.mainApi}Product`)
  }

  public getFilteredProducts(search: any) {
    return this.http.post(`${this.mainApi}Product/FilteredProducts`,search);
  }

  public getProductById(product: IGetById) {
    return this.http.post(`${this.mainApi}Product/GetById`, product);
  }

  public addProduct(product: IProduct){
    return this.http.post(`${this.mainApi}Product/Add`,product);
  }

  public getProductsByCategories(categories : ICategories){
    return this.http.post(`${this.mainApi}Product/GetProductsByCategories`, categories);
  }
}
