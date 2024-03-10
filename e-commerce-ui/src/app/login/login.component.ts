import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
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
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
