import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../services/image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css',
})
export class ShowProductDetailsComponent implements OnInit {
  pageNumber: number = 0;
  productDetails: Product[] = [];

  hasMore: boolean = false;

  displayedColumns: string[] = [
    'Id',
    'Product Name',
    'Product Description',
    'Product DiscountedPrice',
    'Product ActualPrice',
    'Actions',
  ];

  constructor(
    private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
          this.productDetails = response;
          if (response.length == 9) {
            this.hasMore = true;
          } else {
            this.hasMore = false;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  public deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe({
      next: (response) => {
        this.getAllProducts();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
  public showImages(product: Product) {
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages,
      },
      width: '800px',
      height: '500px',
    });
  }

  public editProductDetails(productId: number) {
    this.router.navigate(['/addNewProduct', { productId: productId }]);
  }

  public loadMoreProducts() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  public goToPreviousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber = this.pageNumber - 1;
      this.getAllProducts();
    }
  }
}
