import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {}
  
  getHtmlContent(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }
}
