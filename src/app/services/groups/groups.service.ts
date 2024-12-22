import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../utils/constants/api.base';

// Interfaces matching backend models
interface Contact {
  id: string;
  userId: string;
  groupId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  state: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

interface GroupWithContactListResponse {
  id: string;
  name: string;
  contactList: Contact[];
  createdAt: string;
  updatedAt: string;
}

export interface ContactsToGroupDTO {
  userId: string;
  groupName: string;
  contactList: Omit<Contact, 'id' | 'groupId' | 'createdAt' | 'updatedAt'>[];
}

interface ContactsToGroupWithCSVExcel {
  userId: string;
  groupName: string;
  contactList: File;
}

@Injectable({
  providedIn: 'root'
})
export class ContactGroupService {
  constructor() { }
  
  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private readonly API_PATH = `${API_BASE_URL}/api/v1/contact`;

  // Get all groups with their contacts for a user
  getAllUserGroups(userId: string): Observable<GroupWithContactListResponse[]> {
    return this.httpClient.get<GroupWithContactListResponse[]>(`${this.API_PATH}/groups`, {
      params: { userId }
    });
  }

  // Create a new group with manually entered contacts
  createContactGroup(data: ContactsToGroupDTO): Observable<GroupWithContactListResponse> {
    return this.httpClient.post<GroupWithContactListResponse>(this.API_PATH, data);
  }

  // Create a new group from CSV/Excel file
  createContactGroupFromFile(data: ContactsToGroupWithCSVExcel): Observable<GroupWithContactListResponse> {
    const formData = new FormData();
    formData.append('userId', data.userId);
    formData.append('groupName', data.groupName);
    formData.append('contactList', data.contactList);

    return this.httpClient.post<GroupWithContactListResponse>(
      `${this.API_PATH}/contact-file`, 
      formData
    );
  }

  // Helper method to validate file type (matching backend validation)
  validateFileType(fileName: string): boolean {
    const validExtensions = ['.csv', '.xlsx', '.xls'];
    return validExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
  }

  // Helper method to create empty contact template
  createEmptyContact(): Omit<Contact, 'id' | 'groupId' | 'createdAt' | 'updatedAt'> {
    return {
      userId: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      country: '',
      state: '',
      city: ''
    };
  }
}