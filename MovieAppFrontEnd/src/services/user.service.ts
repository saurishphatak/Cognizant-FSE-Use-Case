import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment.prod';

let debug = console.log;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  className = 'UserService';

  // readonly baseURL = 'http://localhost:5070/api/v1.0/moviebooking';
  readonly baseURL = environment.AUTHENTICATION_API_BASE_URL + `/api/v1.0/moviebooking`;

  constructor(private http: HttpClient) {
  }

  isAdmin = false;
  public username: any;
  public status() {

    if (localStorage.getItem('token') != null) {
      this.username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      if (token) {
        const decodeToken: any = jwtDecode(token);
        this.isAdmin = decodeToken.role.includes('Admin');
      }
      return true;
    }
    else {
      return false;
    }
  }

  login(formData: any) {
    let functionName = 'login()';

    debug(`${this.className}::${functionName}`, formData);

    return this.http.post(`${this.baseURL}/login`, formData);
  }

  register(formData: any) {
    return this.http.post(`${this.baseURL}/register`, formData);
  }

  forgotPassword(formData: any) {
    return this.http.put(`${this.baseURL}/${formData.loginId}/forgot`, formData);
  }

}
