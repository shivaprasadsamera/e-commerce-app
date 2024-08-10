import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css',
})
export class ProductViewDetailsComponent implements OnInit {
  selectedProductIndex = 0;

  product!: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
  }

  changeIndex(index: number) {
    this.selectedProductIndex = index;
  }

  buyProduct(productId: number) {
    this.router.navigate([
      '/buyProduct',
      { isSingleProductCheckout: true, id: productId },
    ]);
  }

  addToCart(productId: number) {
    this.productService.addToCart(productId).subscribe({
      next: (response: any) => {
        // console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error: ', error);
      },
    });
  }
}
