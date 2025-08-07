import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  mainApi = 'https://mini-amazon-backend-iu4n.onrender.com/';
  http = inject(HttpClient);

  public getImages(){
    return this.http.get(`${this.mainApi}Image`);
  }

  public addImage(image: any){
    return this.http.post(`${this.mainApi}Image/AddImage`, image);
  }
}
