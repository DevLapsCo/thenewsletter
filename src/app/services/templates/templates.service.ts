import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../utils/constants/api.base';
import { UserService } from '../user-data/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

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
  private readonly API_PATH = `${API_BASE_URL}/api/v1/templates`;


  // Create new template
  addTemplate(template: any): Observable<any> {
    // Using FormData since we're sending a file
    const formData = new FormData();
    formData.append('title', template.title);
    formData.append('templateVariables', template.templateVariables);
    formData.append('attachments', template.attachments);
    formData.append('templateKeyName', template.templateKeyName);
    formData.append('templateFile', template.templateFile);
    formData.append('sampleKeyName', template.sampleKeyName);
    formData.append('htmlContent', template.htmlContent);
    formData.append('samplePicture', template.samplePicture);

    return this.httpClient.post<any>(`${this.API_PATH}/`, formData);
  }

  // Get a single template
  getTemplate(id: string): Observable<any | any> {
    return this.httpClient.get<any | any>(`${this.API_PATH}/${id}`);
  }

  // Get all templates
  getAllTemplates(): Observable<any[] | any> {
    return this.httpClient.get<any[] | any>(`${this.API_PATH}/`);
  }

  // Delete a template
  deleteTemplate(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_PATH}/${id}`);
  }

  // Helper method to convert template variables from JSON string back to object
  // parseTemplateVariables(jsonString: string): { [key: string]: any } {
  //   try {
  //     return JSON.parse(jsonString);
  //   } catch (e) {
  //     console.error('Error parsing template variables:', e);
  //     return {};
  //   }
  // }
}
