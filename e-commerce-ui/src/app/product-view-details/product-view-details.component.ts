import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css',
})
export class ProductViewDetailsComponent implements OnInit {
  selectedProductIndex = 0;

  product!: Product;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

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
}
