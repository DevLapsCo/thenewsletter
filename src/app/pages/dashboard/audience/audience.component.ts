import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactGroupService } from '../../../services/groups/groups.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAContactDialogComponent } from './dialogs/add-acontact-dialog/add-acontact-dialog.component';
import { AddGroupAndContactComponent } from './dialogs/add-group-and-contact/add-group-and-contact.component';
import { Skeleton, SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-audience',
  standalone: true,
  imports: [FormsModule, SkeletonModule],
  templateUrl: './audience.component.html',
  styleUrl: './audience.component.css'
})
export class AudienceComponent implements OnInit{

  searchKeyword! : string;
  allUserGroups :Array<any> = [];
  toggleContact = false;

  isLoadingContact = signal(false)

  groupService = inject(ContactGroupService)
  dialog = inject(MatDialog)

  ngOnInit(): void {
     this.getAllUserGroups()
  }

  getAllUserGroups(){
    const uid = sessionStorage.getItem("uid");
    if(uid != null){
      this.isLoadingContact.set(true)
      this.groupService.getAllUserGroups(uid).subscribe({
        next: (n :any) => {
          this.isLoadingContact.set(false)
          this.allUserGroups = n
        },
        error: (e : any) => {
          this.isLoadingContact.set(false)
        }
      })
    }
  }

  private colors = [
    '#FF6B6B', // coral red
    '#4ECDC4', // turquoise
    '#45B7D1', // sky blue
    '#96CEB4', // sage green
    '#FFEEAD', // cream yellow
    '#D4A5A5', // dusty rose
    '#9B59B6', // purple
    '#3498DB', // blue
    '#E67E22', // orange
    '#1ABC9C'  // emerald
  ];

  getInitialsColor(index: number): string {
    // Cycle through colors array using modulo
    return this.colors[index % this.colors.length];
  }

  addAContact(){
    const dialogRef = this.dialog.open(AddAContactDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (n : any) => {
        this.toggleContactButton()
        this.getAllUserGroups();
      }
    })
  }

  addGroupWithNewContact(){
    const dialogRef = this.dialog.open(AddGroupAndContactComponent);

    dialogRef.afterClosed().subscribe({
      next: (n : any) => {
        this.getAllUserGroups();
        this.toggleContactButton()
      }
    })
  }
  
  addGroupWithContact(){
    const dialogRef = this.dialog.open(AddAContactDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (n : any) => {
        this.getAllUserGroups();
        this.toggleContactButton()
      }
    })
  }

  toggleContactButton(){
    this.toggleContact = !this.toggleContact;
  }

}
