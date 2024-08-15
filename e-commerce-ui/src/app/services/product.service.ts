import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { OrderDetails } from '../model/order-details.model';
import { Observable, throwError } from 'rxjs';
import { MyOrders } from '../model/my-orders.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8585';

  constructor(private httpClient: HttpClient) {}

  public addProduct(product: FormData) {
    return this.httpClient.post<Product>(
      'http://localhost:8585/api/products/addNewProduct',
      product
    );
  }
  public getAllProducts(pageNumber: number, searchKeyword: string = '') {
    return this.httpClient.get<Product[]>(
      'http://localhost:8585/api/products/getAllProducts?pageNumber=' +
        pageNumber +
        '&searchKey=' +
        searchKeyword
    );
  }

  public getProductDetailsById(productId: number) {
    return this.httpClient.get<Product>(
      'http://localhost:8585/api/products/getProductDetailsById/' + productId
    );
  }

  public deleteProduct(productId: number) {
    return this.httpClient.delete(
      'http://localhost:8585/api/products/deleteProductDetails/' + productId
    );
  }

  public getProductdetails(
    isSingleProductCheckout: boolean,
    productId: number
  ) {
    return this.httpClient.get<Product[]>(
      'http://localhost:8585/api/products/getProductDetails/' +
        isSingleProductCheckout +
        '/' +
        productId
    );
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout: boolean) {
    return this.httpClient.post(
      'http://localhost:8585/api/orders/placeOrder/' + isCartCheckout,
      orderDetails
    );
  }

  public addToCart(productId: number) {
    return this.httpClient.get(
      'http://localhost:8585/api/cart/addToCart/' + productId
    );
  }

  public getCartDetails(): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8585/api/cart/getCartDetails'
    );
  }

  public deleteCartItem(cartId: number) {
    return this.httpClient.delete(
      'http://localhost:8585/api/cart/deleteCartItem/' + cartId
    );
  }

  public getMyOrders(): Observable<MyOrders[]> {
    return this.httpClient.get<MyOrders[]>(
      'http://localhost:8585/api/orders/getMyOrders'
    );
  }

  public getAllUsersOrders(): Observable<MyOrders[]> {
    return this.httpClient.get<MyOrders[]>(
      'http://localhost:8585/api/orders/getAllUsersOrders'
    );
  }

  public markAsDelivered(orderId: number) {
    return this.httpClient.get(
      'http://localhost:8585/api/orders/markAsDelivered/' + orderId
    );
  }

  public createTransaction(amount: number) {
    return this.httpClient.get(
      'http://localhost:8585/api/orders/createTransaction/' + amount
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
