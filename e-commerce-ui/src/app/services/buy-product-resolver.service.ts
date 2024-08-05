import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Product } from '../model/product.model';
import { map, Observable } from 'rxjs';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root',
})
export class BuyProductResolverService implements Resolve<Product[]> {
  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id: any = route.paramMap.get('id');
    const isSingleProductCheckout: any = route.paramMap.get(
      'isSingleProductCheckout'
    );

    return this.productService
      .getProductdetails(isSingleProductCheckout, id)
      .pipe(
        map((products: Product[], i) =>
          products.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      );
  }
}
