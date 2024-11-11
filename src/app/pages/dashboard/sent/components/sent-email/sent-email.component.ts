import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../../../../../services/email/email.service';
import { DropdownModule } from 'primeng/dropdown';
import { NgIf } from '@angular/common';
import { DropdownComponent } from "../dropdown.component";

@Component({
  selector: 'app-sent-email',
  standalone: true,
  imports: [DropdownModule, NgIf, DropdownComponent],
  templateUrl: './sent-email.component.html',
  styleUrl: './sent-email.component.css'
})
export class SentEmailComponent implements OnInit{

  sanitizer = inject(DomSanitizer)
  route = inject(ActivatedRoute)
  emailService = inject(EmailService)


  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (n: any) => {
        this.emailService.getSentEmail(n.id).subscribe({
          next: (n :any) => {
            this.email = n
          }
        })
      }
    })
  }

sanitizedMessage(email: any): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(email);
}

email : any ;

}
