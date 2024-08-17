import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'description',
    'actualPrice',
    'discountedPrice',
    'actions',
  ];
  cartDetails: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    return this.productService.getCartDetails().subscribe({
      next: (response: any) => {
        this.cartDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching cart details:', error);
      },
      complete: () => {
        console.log('Cart details fetch completed.');
      },
    });
  }

  onCheckout() {
    this.router.navigate([
      '/buyProduct',
      { isSingleProductCheckout: false, id: 0 },
    ]);
  }

  deleteCartItem(cartId: number) {
    this.productService.deleteCartItem(cartId).subscribe({
      next: (response) => {
        // Show success notification
        this.snackBar.open('Removed successfully!', 'Close', {
          duration: 3000,
          panelClass: ['custom-snackbar-success'],
        });
        this.getCartDetails();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
