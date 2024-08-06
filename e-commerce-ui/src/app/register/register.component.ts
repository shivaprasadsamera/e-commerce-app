import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  hide = true;
  errorMessage: string | null = null;

  constructor(private router: Router, private userService: UserService) {}
  ngOnInit(): void {}

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  register(registerForm: NgForm) {
    this.userService.registerNewUser(registerForm.value).subscribe({
      next: (response: any) => {
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.errorMessage = 'Server error occurred. Please try again later.';
        } else if (error.status === 401) {
          this.errorMessage =
            'Invalid credentials. Please enter valid username and password.';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
        console.log('Error: ', error);
      },
    });
  }
}
