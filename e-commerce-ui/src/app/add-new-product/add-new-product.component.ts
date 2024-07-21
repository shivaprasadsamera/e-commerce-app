import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css',
})
export class AddNewProductComponent implements OnInit {
  product: Product = {
    productName: '',
    productDescription: '',
    productDiscountedPrice: 0,
    productActualPrice: 0,
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addProduct(productForm: NgForm) {
    this.productService.addProduct(this.product).subscribe({
      next: (response: Product) => {
        productForm.reset();
      },
      error:(error: HttpErrorResponse) => {
        console.log(error);
      }
  });
  }
}
