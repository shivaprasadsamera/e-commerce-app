import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css',
})
export class ShowProductDetailsComponent implements OnInit {
  productDetails: Product[] = [];

  displayedColumns: string[] = [
    'Id',
    'Product Name',
    'Product Description',
    'Product DiscountedPrice',
    'Product ActualPrice',
    'Edit',
    'Delete',
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
    throw new Error('Method not implemented.');
  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response: Product[]) => {
        this.productDetails = response;
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
}
