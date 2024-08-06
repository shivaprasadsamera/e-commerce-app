import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css',
})
export class OrderConfirmationComponent implements OnInit {
  orderPlacedMessage: string | null = 'Order placed successfully!';

  constructor(private router: Router) {}
  ngOnInit(): void {}
  goToHome() {
    this.router.navigate(['/']);
  }
}
