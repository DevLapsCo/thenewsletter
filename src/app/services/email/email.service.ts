import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { API_BASE_URL } from '../../utils/constants/api.base';
import { Router } from '@angular/router';
import { UserService } from '../user-data/user.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

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
  private httpClient = inject(HttpClient);
  private readonly API_PATH = `${API_BASE_URL}/api/v1/email`;

  // Get all templates
  sendEmail(emailDetails: any, userId: string): Observable<any> {
    const url = `${this.API_PATH}/send`; // Replace with your backend API URL
    
      
    return this.httpClient.post(url, emailDetails, {
      params: {
        uId : userId      
      }
    });
  }
  id = localStorage.getItem("uid");


  getAllSentEmails() : any{
    var id = "";
    if(this.id != null){ id = this.id;}
    return this.httpClient.get(`${this.API_PATH}/sent-emails`, {
      params : {
        id : id
      }
    });
  }
 
  getSentEmail(emailId : string){
    return this.httpClient.get(`${this.API_PATH}/sent-email`, {
      params : {
        id : emailId
      }
    });
  }


}
