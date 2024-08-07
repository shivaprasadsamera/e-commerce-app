import { Component, HostListener, OnInit } from '@angular/core';
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
  pageNumber: number = 0;
  productDetails: Product[] = [];

  hasMore: boolean = false;

  cols?: number;

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.updateGridCols();
    // window.addEventListener('resize', this.updateGridCols.bind(this));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateGridCols();
  }

  updateGridCols() {
    const width = window.innerWidth;
    if (width < 600) {
      this.cols = 1;
    } else if (width < 900) {
      this.cols = 2;
    } else if (width < 1200) {
      this.cols = 3;
    } else {
      this.cols = 3;
    } 
  }

  public loadMoreProducts() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  searchByKeyword(searchKeyword: any) {
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKeyword);
  }

  public getAllProducts(searchKey: string = '') {
    this.productService
      .getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((products: Product[], i) =>
          products.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe({
        next: (response: Product[]) => {
          if (response.length == 9) {
            this.hasMore = true;
          } else {
            this.hasMore = false;
          }
          response.forEach((product) => this.productDetails.push(product));
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails', { productId: productId }]);
  }

  privacyPolicy() {
    this.router.navigate(['/orderConfirm']);
  }
}
