import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProductDetail } from '../Models/productDetail.Model';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  mainApi = 'https://localhost:7175/api/';
  http = inject(HttpClient);

  public getProductDetails(){
    return this.http.get(`${this.mainApi}ProductDetail`)
  }

  public getProductDetailByProductId(productDetail: IProductDetail) {
    return this.http.post(`${this.mainApi}ProductDetail/GetProductDetailsByProductId`, productDetail);
  }

  public addProductDetail(productDetail : any){
    return this.http.post(`${this.mainApi}ProductDetail/Add`,productDetail);
  }
}
