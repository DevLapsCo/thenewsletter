// email-chips.component.ts
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-email-chips',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule],
  template: `
    <div class="chips-container">
      <div class="chips-wrapper">
        <div *ngFor="let email of emails; let i = index" class="chip">
          <span class="email-text">{{email}}</span>
          <button class="remove-button" (click)="removeEmail(i)">×</button>
        </div>
        <input
          #emailInput
          type="email"
          [placeholder]="emails.length === 0 ? placeholder : ''"
          (keyup.enter)="addEmail(emailInput)"
          (blur)="addEmail(emailInput)"
          class="email-input"
        >
      </div>
      <div *ngIf="errorMessage" class="error-message">
        {{errorMessage}}
      </div>
    </div>
  `,
  styles: [`
    .chips-container {
      width: 100%;
      font-family: Arial, sans-serif;
    }

    .chips-wrapper {
      border-radius: 4px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      align-items: center;
    }

    .chip {
      background-color: #e0e0e0;
      border-radius: 16px;
      padding: 4px 10px;
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      max-width: 200px;
    }

    .email-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .remove-button {
      border: none;
      background: none;
      color: #666;
      cursor: pointer;
      padding: 0;
      font-size: 18px;
      line-height: 1;
      display: flex;
      align-items: center;
    }

    .remove-button:hover {
      color: #333;
    }

    .email-input {
      border: none;
      outline: none;
      padding: 4px;
      flex: 1;
      min-width: 120px;
    }

    .error-message {
      color: #f44336;
      font-size: 12px;
      margin-top: 4px;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailChipsComponent),
      multi: true
    }
  ]
})
export class EmailChipsComponent implements ControlValueAccessor {
  emails: string[] = [];
  @Output() toEmails : EventEmitter<string[]> = new EventEmitter<string[]>();
  errorMessage: string = '';
  disabled: boolean = false;
  onChange: any = () => {};
  onTouch: any = () => {};

  @Input() placeholder! : string ;

  private emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  writeValue(value: string[]): void {
    if (value) {
      this.emails = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  addEmail(inputElement: HTMLInputElement): void {
    const email = inputElement.value.trim();
    
    if (!email) return;

    if (this.validateEmail(email)) {
      if (!this.emails.includes(email)) {
        this.emails.push(email);
        this.onChange(this.emails);
        this.toEmails.emit(this.emails)
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Email already exists';
        setTimeout(() => {
            this.errorMessage = ''
        }, 7000);
    }
} else {
    this.errorMessage = 'Please enter a valid email address';
    setTimeout(() => {
        this.errorMessage = ''
    }, 7000);
    }

    inputElement.value = '';
  }

  removeEmail(index: number): void {
    this.emails.splice(index, 1);
    this.onChange(this.emails);
    this.toEmails.emit(this.emails)
  }

  private validateEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }
}