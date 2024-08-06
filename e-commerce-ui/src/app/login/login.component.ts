import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  hide = true;
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.errorMessage = null;
    this.userService.login(loginForm.value).subscribe({
      next: (response: any) => {
        if (
          response &&
          response.jwtToken &&
          response.user &&
          response.user.role
        ) {
          const roles = response.user.role;
          const jwtToken = response.jwtToken;

          this.userAuthService.setRoles(roles);
          this.userAuthService.setToken(jwtToken);
          const role = roles[0].roleName;
          if (role === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }
        } else {
          console.error('Invalid response received');
          this.errorMessage =
            'Invalid login response from server. Please try again.';
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.errorMessage = 'Server error occurred. Please try again later.';
        } else if (error.status === 401) {
          this.errorMessage =
            'Invalid credentials. Please check your username and password.';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
        console.log('Error: ', error);
      },
    });
  }

  registerNewUser() {
    this.router.navigate(['/register']);
  }
}
