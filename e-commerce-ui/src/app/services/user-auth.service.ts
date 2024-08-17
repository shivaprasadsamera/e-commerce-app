import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // setRoles
  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  // getRoles

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles') || '[]');
  }

  // setToken
  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  // getToken
  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // clear
  public clear() {
    localStorage.clear();
  }

  // isLoggedIn

  public isLoggedIn() {
    const roles = this.getRoles();
    const token = this.getToken();
    return (
      roles !== null &&
      roles !== undefined &&
      token !== null &&
      token !== undefined
    );
  }

  public isAdmin() {
    const roles: any[] = this.getRoles();
    if (roles && roles.length > 0) {
      return roles[0].roleName === 'Admin';
    }
    return false;
  }

  public isUser() {
    const roles: any[] = this.getRoles();
    if (roles && roles.length > 0) {
      return roles[0].roleName === 'User';
    }
    return false;
  }
}
