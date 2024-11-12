import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../utils/constants/api.base';
import { GeneralId, UserData } from '../../utils/constants/user.interfaces';
import { AuthService } from '../authentication/auth.service';
import { AuthorizeService } from '../authorization/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers!: HttpHeaders;
  private uid!: string;
  private userDataSubject: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);
  userData$: Observable<UserData | null> = this.userDataSubject.asObservable();

  constructor(private http: HttpClient, private router : Router, private auth: AuthorizeService) {
    this.refreshToken().subscribe({
      next: (n: any) => {},
      error: (e) => {
        // console.log(e);
        localStorage.clear();
        router.navigate(['']);
      },
    });
  }

  getUserData(id: GeneralId): Observable<UserData> {
    return this.http.get<any>(`${API_BASE_URL}/api/v1/user/${id.Id}`);
  }
  
  getAllStaff(id: GeneralId): Observable<UserData> {
    return this.http.get<any>(`${API_BASE_URL}/api/v1/user/company-staff`, {params: {companyId : id.Id}});
  }
 
  getAllStaffBirthdaysInMonth(id: string, companyId : string): Observable<UserData> {
    return this.http.get<any>(`${API_BASE_URL}/api/v1/user/company-month-birthdays`, {params: {companyId : companyId,  staffId : id}});
  }
  
  refreshToken(): Observable<any> {
    const id = this.auth.generalGetStorageFtn('uid');
    if(id != null){
      this.uid = id;
    }
    return this.http.get<any>(`${API_BASE_URL}/api/v1/user/refresh-tkn`, {params: {id : this.uid}});
  }

  userData! : any;

  getUserIdFromLS() {
    var userInfo;
    const id = this.auth.generalGetStorageFtn('uid');
    if (id != null) {
      this.getUserData({ Id: id }).subscribe({
        next: (userData: any) => {
          this.userDataSubject.next(userData);
          this.userData = userData;
          // console.log(userData);
          
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
          this.userDataSubject.next(null);
        }
      });
    }
    return this.userData;
  }

  // Optional: Method to update user data manually
  updateUserData(userData: any) {
    this.userDataSubject.next(userData);
  }

  bulkRegisterStaff(formData: FormData): Observable<HttpEvent<any>> {
    return this.http.post<any>(`${API_BASE_URL}/api/v1/authorize/bulk-register-csv`, formData, 
    //   {
    //   reportProgress: true,
    //   observe: 'events'
    // }
  );
  }

  
    bulkRegisterStaffWithoutCSV(formData: Array<any>): Observable<HttpEvent<any>> {
      return this.http.post<any>(`${API_BASE_URL}/api/v1/authorize/bulk-register`, formData, {
        reportProgress: true,
        observe: 'events'
      });
    }
    
    registerStaff(payload : Object): Observable<HttpEvent<any>> {
      return this.http.post<any>(`${API_BASE_URL}/api/v1/authorize/register`, payload, {
        reportProgress: true,
        observe: 'events'
      });
    }
  
    updateStaff(payload : Object): Observable<HttpEvent<any>> {
      return this.http.put<any>(`${API_BASE_URL}/api/v1/user/staff`, payload, {
        reportProgress: true,
        observe: 'events'
      });
    }


}