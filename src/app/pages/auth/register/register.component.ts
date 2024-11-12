import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OAuth2Google } from '../../../utils/constants/api.base';
import { AuthorizeService } from '../../../services/authorization/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  status = '';

  authorize = inject(AuthorizeService)
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
      ]],
      confirmPassword: ['', Validators.required],
      rememberMe: [false]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    // Reset form status when component initializes
    this.status = '';
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  // Helper method to check if field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  // Helper method to get error message
  getErrorMessage(fieldName: string): string {
    const control = this.registerForm.get(fieldName);
    if (!control) return '';

    if (control.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    if (control.hasError('minlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    }
    
    if (control.hasError('pattern')) {
      if (fieldName === 'password') {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      if (fieldName === 'username') {
        return 'Username can only contain letters, numbers, dots, underscores, and hyphens';
      }
    }

    return '';
  }

  async register() {
    if (this.registerForm.valid) {
      try {
        this.loading = true;
        this.status = '';

        const response = await this.authorize.registerUser({
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password
        }).toPromise();

        this.router.navigate(['/await']);
      } catch (error: any) {
        this.loading = false;
        if (error.status === 403) {
          this.status = 'Email is already in use';
        } else {
          this.status = 'Registration failed. Please try again later.';
        }
      }
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  googleOAuth() {
    window.location.href = OAuth2Google;
  }
}