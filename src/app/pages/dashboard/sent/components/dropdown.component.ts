import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  template: `
    <div class="relative">
      <button
        class="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-600 w-full flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        (click)="toggleDropdown()"
        [ngClass]="{ 'bg-blue-100 border-blue-500': isOpen }"
      >
        <span>{{ selectedOption || placeholder }}</span>
        <svg
          class="h-5 w-5 text-gray-500"
          [ngClass]="{ 'transform rotate-180': isOpen }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        class="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 overflow-y-auto max-h-48 shadow-lg"
        *ngIf="isOpen"
      >
        <div
          *ngFor="let option of options"
          (click)="selectOption(option); toggleDropdown()"
          class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {{ option }}
        </div>
      </div>
    </div>
  `,
})
export class DropdownComponent {
  @Input() options!: string[];
  @Input() placeholder!: string;
  selectedOption!: string;
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }
}