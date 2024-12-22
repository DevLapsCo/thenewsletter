import { Component, inject, signal } from '@angular/core';
import { UserTemplatesService } from '../../../../../services/user-templates/user-templates.service';
import { Router } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent {

  userTemplateService = inject(UserTemplatesService)
  router = inject(Router)
  snackbar = inject(MatSnackBar)

  creatingNewTemplate = signal(false)

  createNewTemplate() {
    const uid = sessionStorage.getItem('uid');
    if (uid != null) {
      this.creatingNewTemplate.set(true)
      this.userTemplateService.createNewTemplate(uid).subscribe({
        next: (n: any) => {
          this.creatingNewTemplate.set(false)
          this.router.navigate(['builder'], { queryParams: { tempId: n.templateId } });        },
        error: (error) => {
          // Make sure to handle errors and set creatingNewTemplate to false
          this.creatingNewTemplate.set(false)
          this.snackbar.open('An Error occured!', 'Ok', {
            duration: 3000
          });
          // Handle error appropriately
        }
      })
    }
  }


  instantLetter(){
    this.creatingNewTemplate.set(true)
    setTimeout(() => {
      this.creatingNewTemplate.set(false)
      this.router.navigate(['instant'])
    }, 2000)
  }

}
