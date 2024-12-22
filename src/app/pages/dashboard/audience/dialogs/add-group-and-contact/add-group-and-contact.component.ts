import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ContactGroupService } from '../../../../../services/groups/groups.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-group-and-contact',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './add-group-and-contact.component.html',
  styleUrls: ['./add-group-and-contact.component.css']
})
export class AddGroupAndContactComponent {
  groupName: string = '';
  localAddedContacts: Array<any> = [];

  isAddingContact = signal(false)

  readonly dialogRef = inject(MatDialogRef<AddGroupAndContactComponent>);
  
  groupService = inject(ContactGroupService)

  constructor(private http: HttpClient) {}

  addManualContact() {
    this.localAddedContacts.push({ firstName: '', lastName: '', email: '' });
  }

  removeContact(index: number) {
    this.localAddedContacts.splice(index, 1);
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const content = e.target.result;
        this.parseFileContent(content);
      };
      reader.readAsText(file);
    }
  }

  parseFileContent(content: string) {
    const rows = content.split('\n');
    rows.forEach(row => {
      const [firstName, lastName, email] = row.split(',');
      if (firstName && email) {
        this.localAddedContacts.push({ firstName: firstName.trim(), lastName: lastName?.trim(), email: email.trim() });
      }
    });
  }

  uploadFile() {
    const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  submitGroup() {
    if (!this.groupName) {
      alert('Please provide a group name.');
      return;
    }

    if (this.localAddedContacts.length === 0) {
      alert('Please add at least one contact.');
      return;
    }

    const uid = sessionStorage.getItem("uid");

    var payload : any;

    if(uid != null){
      payload = {
        userId: uid,
        groupName: this.groupName,
        contactList: this.localAddedContacts
      };
    }

    this.isAddingContact.set(true)
    
    
    this.groupService.createContactGroup(payload).subscribe({
      next: (n : any) => {
        this.isAddingContact.set(false);
        this.dialogRef.close(true)
      },
      error: (n :any) => {
        this.isAddingContact.set(false);
      }
    })
    
  }

  resetForm() {
    this.groupName = '';
    this.localAddedContacts = [];
  }
}
