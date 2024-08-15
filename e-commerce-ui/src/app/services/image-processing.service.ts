import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { FileHandle } from '../model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ImageProcessingService {
  constructor(private domSanitizer: DomSanitizer) {}

  public createImages(product: Product): Product {
    if (!product.productImages || !Array.isArray(product.productImages)) {
      console.warn('Product images are not available or not an array');
      return product; // Return the product as is if no images are available
    }

    const productImages: any[] = product.productImages;
    const productImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < productImages.length; i++) {
      const imagesFiledata = productImages[i];
      const imageBlob = this.dataURItoBlob(imagesFiledata.picByte, imagesFiledata.type);

      const imageFile = new File([imageBlob], imagesFiledata.name, {
        type: imagesFiledata.type,
      });

      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.domSanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(imageFile)
        ),
      };

      productImagesToFileHandle.push(finalFileHandle);
    }

    product.productImages = productImagesToFileHandle;
    return product;
  }

  private dataURItoBlob(picBytes: string, imageType: string): Blob {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], { type: imageType });
  }
}
