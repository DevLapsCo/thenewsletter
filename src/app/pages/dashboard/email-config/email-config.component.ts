import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { ProviderValidationService } from '../../../services/providerValidation/provider-validation.service';
import { NgIf } from '@angular/common';
import { UserService } from '../../../services/user-data/user.service';
import { LoaderComponent } from "../../../shared/loader/loader.component";

@Component({
  selector: 'app-email-config',
  standalone: true,
  imports: [TagModule, SkeletonModule, NgIf, ReactiveFormsModule, LoaderComponent],
  templateUrl: './email-config.component.html',
  styleUrls: ['./email-config.component.css']
})
export class EmailConfigComponent {
  providerValidation = inject(ProviderValidationService);
  form: FormGroup;
  userData = inject(UserService)
  isValid: boolean | null = null; // Track validation status

  constructor(private fb: FormBuilder) {
    // Initialize the reactive form
    this.form = this.fb.group({
      host: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      port: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

    this.getUserProvider();
  }

  isLoading = false;

  getUserProvider(){
    const id = localStorage.getItem('uid')
    if(id != null)
    this.providerValidation.getAProvider(id).subscribe({
       next: (n : any) => {
        this.form.get('username')?.setValue(n.username);
        this.form.get('password')?.setValue(n.password);
        this.form.get('host')?.setValue(n.host);
        this.form.get('port')?.setValue(n.port);
       },
       error: (e : any) => {

       }
    })
  }

  validateProvider() {
    if (this.form.valid) {
      const configData = this.form.value;
       this.isLoading = true;
       const id = localStorage.getItem('uid')
       this.providerValidation.updateEmailConfig({...configData, userId : id}).subscribe({
         next: (n : any) => {
              this.isLoading = false;
              this.isValid = true;
            },
            error : (e : any) => {
              this.isLoading = false;
              this.isValid = false;
              // console.error('Validation failed', e);
            }
       })
    } else {
      this.isValid = false; // Show invalid if form is not complete
    }
  }
}
