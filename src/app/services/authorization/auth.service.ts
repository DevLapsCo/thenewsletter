import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GeneralId,
  LoginUser,
  RegisterUser,
} from '../../utils/constants/user.interfaces';
import { API_BASE_URL } from '../../utils/constants/api.base';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  headers!: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'X-Skip-JWT-Interceptor': 'true',
    });
  }

  registerUser(registerUser: RegisterUser) {
    return this.http.post(
      API_BASE_URL + `/api/v1/authorize/register`,
      registerUser,
      { headers: this.headers }
    );
  }

  authorizeOAuth(generalId: GeneralId) {
    return this.http.post(
      API_BASE_URL + `/api/v1/auth/general-verification`,
      generalId,
      { headers: this.headers }
    );
  }

  authorizeRegistration(verifyCode: object) {
    return this.http.post(
      API_BASE_URL + `/api/v1/authorize/verify-user`,
      verifyCode,
      { headers: this.headers }
    );
  }

  storeJwt(token: string) {
    sessionStorage.setItem('jwt_tkn', token);
  }

  generalStorageFtn(value: string, key: string) {
    sessionStorage.setItem(key, value);
  }

  generalGetStorageFtn(key: string) {
    return sessionStorage.getItem(key);
  }

  isTokenPresent(): boolean {
    const token = sessionStorage.getItem('jwt_tkn');
    return !!token;
  }
}
