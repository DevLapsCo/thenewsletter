import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../utils/constants/api.base';

@Injectable({
  providedIn: 'root'
})
export class ProviderValidationService {

  httpClient = inject(HttpClient);

  constructor(){}

  updateEmailConfig(payload : object){
    return this.httpClient.post(`${API_BASE_URL}/api/v1/email/config`, payload)
  }
  
  getAProvider(id : string){
    return this.httpClient.get(`${API_BASE_URL}/api/v1/email/user-provider`, {
      params : {id : id}
    })
  }

}
