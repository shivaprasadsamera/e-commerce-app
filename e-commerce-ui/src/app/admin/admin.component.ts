import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  message: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.forAdmin();
  }

  forAdmin() {
    this.userService.forUser().subscribe({
      next: (response) => {
        console.log(response);
        this.message = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
