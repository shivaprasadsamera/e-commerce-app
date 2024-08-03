import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ImageProcessingService } from '../services/image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  productDetails: Product[] = [];

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    throw new Error('Method not implemented.');
  }

  public getAllProducts() {
    this.productService
      .getAllProducts()
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe({
        next: (response: Product[]) => {
          this.productDetails = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails', { productId: productId }]);
  }
}
