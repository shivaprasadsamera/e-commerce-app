import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MyOrders } from '../model/my-orders.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnInit {
  myOrders: MyOrders[] = [];
  displayedColumns: string[] = [
    'orderId',
    'orderFullName',
    'orderContactNumber',
    'orderAmount',
    'orderStatus',
    'productName',
    'orderFullAddress',
  ];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders() {
    this.productService.getMyOrders().subscribe({
      next: (response: MyOrders[]) => {
        this.myOrders = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
