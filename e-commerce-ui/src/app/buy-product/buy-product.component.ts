import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css',
})
export class BuyProductComponent implements OnInit {
  productdetails: Product[] = [];
  isCartCheckout: boolean = false;
  errorMessage: string | null = null;
  isLoading = false;

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: [],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productdetails = this.activatedRoute.snapshot.data['productdetails'];
    const isCartCheckoutStr = this.activatedRoute.snapshot.paramMap.get(
      'isSingleProductCheckout'
    );
    this.isCartCheckout = isCartCheckoutStr === 'true';
    this.productdetails.forEach((product) =>
      this.orderDetails.orderProductQuantityList.push({
        productId: product.productId,
        quantity: 1,
      })
    );
  }

  public placeOrder(orderForm: NgForm) {
    if (orderForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }
    this.isLoading = true;
    this.productService
      .placeOrder(this.orderDetails, this.isCartCheckout)
      .subscribe({
        next: (response) => {
          orderForm.reset();
          this.router.navigate(['/orderConfirm']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Order placement failed:', error);
          this.errorMessage = 'Failed to place the order. Please try again.';
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  getQuantityForProduct(productId: number) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId: number, productDiscountedPrice: number) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity * productDiscountedPrice;
  }

  onQuantityChanged(quantity: any, productId: number) {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = quantity;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;

    this.orderDetails.orderProductQuantityList.forEach((productQuantity) => {
      const productPrice = this.productdetails.filter(
        (product) => product.productId === productQuantity.productId
      )[0].productDiscountedPrice;
      grandTotal = grandTotal + productPrice * productQuantity.quantity;
    });
    return grandTotal;
  }
}
