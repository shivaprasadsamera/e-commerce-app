import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public addProduct(product: FormData) {
    return this.httpClient.post<Product>(
      'http://localhost:8585/addNewProduct',
      product
    );
  }
  public getAllProducts() {
    return this.httpClient.get<Product[]>(
      'http://localhost:8585/getAllProducts'
    );
  }
  public deleteProduct(productId: number) {
    return this.httpClient.delete(
      'http://localhost:8585/deleteProductDetails/' + productId
    );
  }
}
