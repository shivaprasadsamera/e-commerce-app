import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  API_PATH = 'http://localhost:8585';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData: any) {
    return this.httpClient.post(this.API_PATH + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }
  /**
   * forUser
   */
  public forUser() {
    return this.httpClient.get(this.API_PATH + '/forUser', {
      responseType: 'text',
    });
  }

  /**
   * forAdmin
   */
  public forAdmin() {
    return this.httpClient.get(this.API_PATH + '/forAdmin', {
      responseType: 'text',
    });
  }

  /**
   * roleMatch
   */
  public roleMatch(allowedRoles: any): boolean | undefined {
    const userRoles: any[] = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        if (allowedRoles.includes(userRoles[i].roleName)) {
          return true;
        }
      }
    }
    return undefined;
  }

  ngOnInit(): void {}
}
