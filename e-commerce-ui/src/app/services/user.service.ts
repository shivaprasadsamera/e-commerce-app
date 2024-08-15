import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

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

  ngOnInit(): void {}


  public login(loginData: any) {
    return this.httpClient.post(this.API_PATH + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }
  /**
   * forUser
   */
  public forUser() {
    return this.httpClient.get(this.API_PATH + '/api/users/forUser', {
      responseType: 'text',
    });
  }

  /**
   * forAdmin
   */
  public forAdmin() {
    return this.httpClient.get(this.API_PATH + '/api/users/forAdmin', {
      responseType: 'text',
    });
  }

  public registerNewUser(registerData: any) {
    return this.httpClient.post(
      this.API_PATH + '/api/users/registerNewUser',
      registerData
    );
  }

  //roleMatch
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


  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API_PATH + '/api/users/getAllUsers');
  }
}
