import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css',
})
export class ProductViewDetailsComponent implements OnInit {
  selectedProductIndex = 0;

  product!: Product;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);

    throw new Error('Method not implemented.');
  }

  changeIndex(index: number) {
    this.selectedProductIndex = index;
  }
}
