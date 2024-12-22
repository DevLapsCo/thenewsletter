import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from '../../utils/constants/api.base';
import { UserService } from '../user-data/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserTemplatesService {
  
  constructor(private user : UserService) {
    user.refreshToken().subscribe({
      next: (n: any) => {},
      error: (e) => {
        // console.log(e);
        localStorage.clear();
        this.router.navigate(['']);
      },
    });
   }

   router = inject(Router)
  
  httpClient = inject(HttpClient)
  
  public readonly API_PATH = `${API_BASE_URL}/api/v1/user-template`;
  
  createNewTemplate(id: string): Observable<any | any> {
    return this.httpClient.get<any | any>(`${this.API_PATH}/`, {
        params: {
          id : id
        }
      });
    }
    
    
    updateTemplate(updateTemplate: any) {
      return this.httpClient.put(`${this.API_PATH}/updateBuilder`, updateTemplate)
    }
    
    // Template Builder events

    saveTemplate(projectId: string, userId: string,  html: string, cssString: string) {
      const payload = {
        id: projectId,
        userId: userId,
        html: html,
        css: cssString
      };
  
      return this.httpClient.patch(`${this.API_PATH}/${projectId}`, payload);
    }
  
    loadTemplateToPage(templateId: string, userId : string): Observable<any> {
      return this.httpClient.get(`${this.API_PATH}/temp`, {
        params: {
          userId : userId,
          templateId: templateId
        }
      });
    }
 
    getAllUserTemplates(userId : string): Observable<any> {
      return this.httpClient.get(`${this.API_PATH}/temp-all`, {
        params: {
          userId : userId,
        }
      });
    }
   
    loadTemplate(projectId: string): Observable<{ html: string; css: string }> {
      return this.httpClient.get(`${this.API_PATH}/${projectId}`).pipe(
        map((response: any) => response.data)
      );
    }

    // Groups


   
  
}
