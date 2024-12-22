import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../utils/constants/api.base';
import { SendLetter, SendLetterResponse, SendImmediateRequest } from '../../utils/constants/company.interface';

@Injectable({
  providedIn: 'root'
})
export class SendEmailsV2Service {
  private readonly baseUrl = `${API_BASE_URL}/api/v2/letters`;
  
  constructor(private http: HttpClient) { }
  
  /**
   * Schedule an email for future sending
   */
  scheduleLetter(letter: SendLetter): Observable<SendLetterResponse> {
    return this.http.post<SendLetterResponse>(`${this.baseUrl}/send-scheduled`, letter);
  }
  
  /**
   * Send an email immediately
   */
  sendImmediate(request: SendImmediateRequest): Observable<SendLetterResponse> {
    return this.http.post<SendLetterResponse>(`${this.baseUrl}/send-immediate`, request);
  }
  
  /**
   * Get the status of a scheduled letter
   */
  getLetterStatus(id: string): Observable<SendLetterResponse> {
    return this.http.get<SendLetterResponse>(`${this.baseUrl}/status/${id}`);
  }
  
  /**
   * Cancel a scheduled letter
   */
  cancelScheduledLetter(id: string): Observable<SendLetterResponse> {
    return this.http.delete<SendLetterResponse>(`${this.baseUrl}/${id}`);
  }

  /**
   * Convenience method to quickly send to a group
   */
  quickSend(templateId: string, groupId: string): Observable<SendLetterResponse> {
    const userId = sessionStorage.getItem('uid');
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    return this.sendImmediate({ userId, templateId, groupId });
  }

  /**
   * Schedule an email with simplified parameters
   */
  scheduleEmail(templateId: string, groupId: string, scheduledTime: Date): Observable<SendLetterResponse> {
    const userId = sessionStorage.getItem('uid');
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const letter: SendLetter = {
      userId,
      templateId,
      groupId,
      scheduledTime
    };

    return this.scheduleLetter(letter);
  }

  sendTest(payload : any) : Observable<any>{
    return this.http.post(`${API_BASE_URL}/api/v2/letters/send-test`, payload)
  }
}