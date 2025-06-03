import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { ImageService } from '../../Services/image-service.service';
import { IImage } from '../../Models/Image.Model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image',
  imports: [CommonModule,
            FormsModule,
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent {

  imageService = inject(ImageService);
  images: IImage | any = []
  selectedFiles: File[] = []
  
  ngOnInit(): void{
    this.imageService.getImages().subscribe((data: any) => {
      this.images = data.images;
      console.log(data);
    });
  }
  

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
    console.log(this.selectedFiles);
  }

  AddImage() {
    const formData = new FormData();

    formData.append('productId', '101');
    formData.append('imageTypeId', '101');

    this.selectedFiles.forEach((file) => {
      console.log(file)
      formData.append('images', file);
    });

    this.imageService.addImage(formData).subscribe((res: any) => {
      console.log(res);
    });
  }
}
