import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { ProviderValidationService } from '../../../services/providerValidation/provider-validation.service';
import { NgIf, NgStyle } from '@angular/common';
import { UserService } from '../../../services/user-data/user.service';
import { LoaderComponent } from "../../../shared/loader/loader.component";
import { EmailProviderDocsComponent } from "./hot-to/how-to.component";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddProviderComponent } from './dialog/add-provider/add-provider.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomToasterService } from '../../../services/custom-toaster/custom-toaster.service';

@Component({
  selector: 'app-email-config',
  standalone: true,
  imports: [SkeletonModule, NgStyle, NgIf, EmailProviderDocsComponent],
  templateUrl: './email-config.component.html',
  styleUrls: ['./email-config.component.css']
})
export class EmailConfigComponent {
  providerValidation = inject(ProviderValidationService);
  form: FormGroup;
  userData = inject(UserService)
  sanckbar = inject(MatSnackBar)
  toaster = inject(CustomToasterService)
  dialog = inject(MatDialog)
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

  providers : Array<any>= [];

  openAddProviderDialog(){
    this.dialog.open(AddProviderComponent)
  }
 
  openDocsDiolog(){
    this.dialog.open(EmailProviderDocsComponent)
  }
  
  isLoading = false;

  transform(value: string): string {
    return value ? '•'.repeat(value.length) : '';
  }

  getUserProvider(){
    this.isLoading = true;
    const id = sessionStorage.getItem('uid')
    if(id != null)
    this.providerValidation.getAllUserProvider(id).subscribe({
       next: (n : any) => {
        this.isLoading = false
       this.providers = n.providers
       },
       error: (e : any) => {

       }
    })
  }



  makeProviderActive(item : any){
    var newProviderUpdate = JSON.parse(JSON.stringify(this.providers));
    for(let i = 0; i < newProviderUpdate.length; i++){
       if(newProviderUpdate[i].id == item.id){
         newProviderUpdate[i].active = true
        } else {
          newProviderUpdate[i].active = false  
       }
      }

      this.providerValidation.UpdateAllUserProvider(newProviderUpdate).subscribe({
        next: (n : any) => {
          this.sanckbar.open("Provider is active now!", "Ok")
        },
        error: (e) => {
          this.toaster.show("error", "An error occured, could not make the provider active!")
        }
      })

  }

  
}
