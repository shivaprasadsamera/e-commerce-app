import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css',
})
export class OrderConfirmationComponent implements OnInit {
  isAdmin: boolean;
  orderPlacedMessage: string | null = 'Order placed successfully!';
  arrivalTime: string | null = 'It will arrived in 4 to 5 bussiness days!';

  constructor(private router: Router, private userAuthService: UserAuthService) {
    this.isAdmin = this.userAuthService.isAdmin();
  }
  ngOnInit(): void {}
  goToHome() {
    this.router.navigate(['/']);
  }
}
