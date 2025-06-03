import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { IProduct } from '../../Models/Product.Model';
import { IProductDetail } from '../../Models/productDetail.Model';
import { IImage } from '../../Models/Image.Model';
import { ImageService } from '../../Services/image-service.service';
import { ProductService } from '../../Services/product-service.service';
import { ProductDetailService } from '../../Services/product-detail.service';
import { IGetById } from '../../Models/GetById.Model';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule,
            MatIconModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatDialogModule,
            MatStepperModule,
            MatSelectModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  product : IProduct | any = {}
  productDetail : IProductDetail | any ={}
  image : IImage | any = {}
  Id : IGetById | any =  {}
  selectedFiles: File[] = []
  exist : boolean = false

  productService = inject(ProductService)
  productDetailService = inject(ProductDetailService)
  imageService = inject(ImageService)

  constructor(@Inject(MAT_DIALOG_DATA) public data: null | any) {
    this.Id.id = data.Id
  }

  ngOnInit() : void{
    if(this.Id.id){
      this.exist = true;
      this.productService.getProductById(this.Id).subscribe((res : any) => {
        this.product = res.productDetails;
      });

      this.productDetailService.getProductDetailByProductId(this.Id).subscribe((res : any) => {
        this.productDetail = res.productDetail;
      });
    } else {
      this.exist = false;
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
    console.log(this.selectedFiles);
  }

  addProduct(){
    this.productService.addProduct(this.product).subscribe((res : any) =>{
      console.log(res)
    
      const productId = res.productId

      this.productDetail.productId = productId
      this.productDetailService.addProductDetail(this.productDetail).subscribe((res : any) =>{
          console.log(res);
      })

      if(this.selectedFiles.length > 0){
        const formData = new FormData();

        formData.append('productId', productId);
        formData.append('imageTypeId', '101');

        this.selectedFiles.forEach((file) => {
          formData.append('images', file);
        });

        this.imageService.addImage(formData).subscribe((res: any) => {
          console.log(res);
        });
      }
    })
  }

  updateProduct(){

  }
}
