import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  mainApi = 'https://localhost:7175/api/';
  http = inject(HttpClient);

  public getImages(){
    return this.http.get(`${this.mainApi}Image`);
  }

  public addImage(image: any){
    return this.http.post(`${this.mainApi}Image/AddImage`, image);
  }
}
