import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../utils/constants/api.base';
import { Router } from '@angular/router';
import { UserService } from '../user-data/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderValidationService {

  httpClient = inject(HttpClient);

  constructor(private userService : UserService, private router : Router) { 
    this.userService.refreshToken().subscribe({
      next: (n: any) => {},
      error: (e) => {
        // console.log(e);
        localStorage.clear();
        router.navigate(['']);
      },
    });
  }

  updateEmailConfig(payload : object){
    return this.httpClient.post(`${API_BASE_URL}/api/v1/email/config`, payload)
  }
  
  getAProvider(id : string){
    return this.httpClient.get(`${API_BASE_URL}/api/v1/email/user-provider`, {
      params : {id : id}
    })
  }

  getAllUserProvider(id : string){
    return this.httpClient.get(`${API_BASE_URL}/api/v1/email/user-providers`, {
      params : {id : id}
    })
  }

  UpdateAllUserProvider( payload: object){
    return this.httpClient.put(`${API_BASE_URL}/api/v1/email/user-providers`, payload)
  }

}
