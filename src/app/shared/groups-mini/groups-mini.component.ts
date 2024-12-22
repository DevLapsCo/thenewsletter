import { Component, inject, OnInit, signal, computed, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactGroupService } from '../../services/groups/groups.service';

@Component({
  selector: 'app-groups-mini',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './groups-mini.component.html',
  styleUrl: './groups-mini.component.css'
})
export class GroupsMiniComponent implements OnInit {
  isLoading = signal(false);
  groupService = inject(ContactGroupService);
  searchKeyword: string = '';
  allUserGroups: Array<any> = [];

  @Output() groupId : EventEmitter<any> = new EventEmitter();

  // Create a computed property for filtered groups
  filteredGroups(){
    if (!this.searchKeyword) {
      return this.allUserGroups;
    }
    
    const searchTerm = this.searchKeyword.toLowerCase().trim();
    return this.allUserGroups.filter(group => {
      // Search in group name
      if (group.name.toLowerCase().includes(searchTerm)) {
        return true;
      }
      // Search in group notes
      if (group.notes?.toLowerCase().includes(searchTerm)) {
        return true;
      }
      // Search in contact names
      if (group.contactList?.some((contact: any) => 
        contact.firstName.toLowerCase().includes(searchTerm) || 
        contact.lastName.toLowerCase().includes(searchTerm)
      )) {
        return true;
      }
      return false;
    });
  }

  private colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
    '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#1ABC9C'
  ];

  ngOnInit(): void {
    this.getGroups();
  }

  getInitialsColor(index: number): string {
    return this.colors[index % this.colors.length];
  }

  getGroups() {
    const uid = sessionStorage.getItem("uid");
    if (uid != null) {
      this.isLoading.set(true);
      this.groupService.getAllUserGroups(uid).subscribe({
        next: (n: any) => {
          this.allUserGroups = n;
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error fetching groups:', error);
          this.isLoading.set(false);
        }
      });
    }
  }

  selectedGroupId: string | null = null;
  
  selectedGroup(group: string) {
    this.selectedGroupId = group;
    this.groupId.emit(group);
  }
}