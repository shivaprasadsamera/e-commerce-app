import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderDetails } from '../model/order-details.model';
import { Product } from '../model/product.model';
import { ActivatedRoute } from '@angular/router';
import { OrderQuantity } from '../model/order-quantity.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'quantity',
    'price',
    'total',
    'actions',
  ];
  cartDetails: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    return this.productService.getCartDetails().subscribe({
      next: (response: any) => {
        console.log(response);
        this.cartDetails = response.map((item: any) => ({
          ...item,
          quantity: item.quantity || 0,
          total: this.calculateTotal(item),
        }));
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching cart details:', error);
      },
      complete: () => {
        console.log('Cart details fetch completed.');
      },
    });
  }
  handleQuantityChange(event: any, index: number) {
    const newQuantity = +event.target.value;
    this.cartDetails[index].quantity = newQuantity;
    this.cartDetails[index].total = this.calculateTotal(
      this.cartDetails[index]
    );
  }

  calculateTotal(item: any): number {
    if (this.cartDetails.length === 1 || item.quantity === 1) {
      return item.product.productDiscountedPrice;
    } else {
      return item.quantity * item.product.productDiscountedPrice;
    }
  }
}
