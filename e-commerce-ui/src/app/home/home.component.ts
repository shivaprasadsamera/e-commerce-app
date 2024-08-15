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

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
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
          if (response.length == 12) {
            this.hasMore = true;
          } else {
            this.hasMore = false;
          }
          response.forEach((product) => this.productDetails.push(product));
        },
        error: (error: HttpErrorResponse) => {
          console.log('Error fetching products:', error);
        },
      });
  }

  showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails', { productId: productId }]);
  }

  privacyPolicy() {
    this.router.navigate(['/orderConfirm']);
  }
  showScrollTopButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTopButton = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
