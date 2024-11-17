import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from "../../../../../shared/loader/loader.component";
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProviderValidationService } from '../../../../../services/providerValidation/provider-validation.service';
import { TagModule } from 'primeng/tag';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-provider',
  standalone: true,
  imports: [LoaderComponent, TagModule, ReactiveFormsModule, MatButtonModule, MatDialogModule],
  templateUrl: './add-provider.component.html',
  styleUrl: './add-provider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProviderComponent {

  form: FormGroup;
  isLoading!: boolean;
  providerValidation = inject(ProviderValidationService);
  isValid!: boolean;

  dialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)

  
  constructor(private fb: FormBuilder) {
    // Initialize the reactive form
    this.form = this.fb.group({
      host: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      port: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

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
              this.dialog.closeAll();
              this.snackBar.open(n.message, "Ok")
            },
            error : (e : any) => {
              this.isLoading = false;
              this.isValid = false;
              console.error('Validation failed', e);
            }
       })
    } else {
      this.isLoading = false
      this.isValid = false; // Show invalid if form is not complete
    }
  }

}
