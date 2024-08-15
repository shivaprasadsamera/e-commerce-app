import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MyOrders } from '../model/my-orders.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-orders-info',
  templateUrl: './all-orders-info.component.html',
  styleUrls: ['./all-orders-info.component.css'],
})
export class AllOrdersInfoComponent implements OnInit {
  @ViewChild('paginator1') paginator1: MatPaginator | undefined;
  @ViewChild('paginator2') paginator2: MatPaginator | undefined;
  myOrders = new MatTableDataSource<MyOrders>([]);
  filteredOrders = new MatTableDataSource<MyOrders>([]);
  displayedColumns: string[] = [
    'orderId',
    'orderFullName',
    'orderContactNumber',
    'orderAmount',
    'orderStatus',
    'productName',
    'orderFullAddress',
    'actions',
  ];
  displayedColumnsUsers: string[] = [
    'userId',
    'userFullName',
    'userEmail',
    'userRole',
  ];
  constructor(private productservice: ProductService) {}
  ngOnInit(): void {
    this.getAllUsersOrders();
  }

  ngAfterViewInit() {
    if (this.paginator1) {
      this.filteredOrders.paginator = this.paginator1;
    }

    if (this.paginator2) {
      this.myOrders.paginator = this.paginator2;
    }
  }

  getAllUsersOrders() {
    this.productservice.getAllUsersOrders().subscribe({
      next: (response: MyOrders[]) => {
        this.myOrders.data = response;
        this.filteredOrders.data = response;
        if (this.paginator1) {
          this.filteredOrders.paginator = this.paginator1;
        }

        if (this.paginator2) {
          this.myOrders.paginator = this.paginator2;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  applyFilter(filterValue: string) {
    if (filterValue === 'all') {
      this.filteredOrders.data = this.myOrders.data;
    } else {
      this.filteredOrders.data = this.myOrders.data.filter(
        (order) => order.orderStatus.toLowerCase() === filterValue.toLowerCase()
      );
    }

    if (this.paginator1) {
      this.filteredOrders.paginator!.firstPage();
    }
  }

  markAsDelivered(orderId: number) {
    this.productservice.markAsDelivered(orderId).subscribe({
      next: (response) => {
        this.getAllUsersOrders();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
