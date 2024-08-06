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
    this.productdetails.forEach((product) =>
      this.orderDetails.orderProductQuantityList.push({
        productId: product.productId,
        quantity: 1,
      })
    );

    console.log(this.productdetails);
    console.log(this.orderDetails);
    throw new Error('Method not implemented.');
  }

  public placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails).subscribe({
      next: (response) => {
        console.log(response);
        orderForm.reset();
        this.router.navigate(['/orderConfirm']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
