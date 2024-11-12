import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormatDatePipe } from '../../../shared/tiome-format/time-format.pipe';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EmailService } from '../../../services/email/email.service';
import { ImplicitReceiver } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { LoaderComponent } from "../../../shared/loader/loader.component";

@Component({
  selector: 'app-sent',
  standalone: true,
  imports: [RouterOutlet, SkeletonModule, CommonModule, FormsModule, FormatDatePipe, RouterLink, LoaderComponent],
  templateUrl: './sent.component.html',
  styleUrl: './sent.component.css',
})
export class SentComponent implements OnInit{
[x: string]: any;

ngOnInit(): void {
  this.getAllSentEmails();
}

isLoading = true;

  sentEmails : Array<any> = [];

  key! : string;

  findEmail(key: string) {
    // Filters sentEmails based on whether the subject includes the key, case-insensitive
    this.sentEmails = this.sentEmails.filter((email: any) =>
        email.subject.toLowerCase().includes(key.toLowerCase())
    );

    if(key == ""){
      this.getAllSentEmails()
    }
}

   htmlToText(html: string): string {
    const tempDiv = document.createElement('p');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  sentService = inject(EmailService)

  getAllSentEmails(){
    this.isLoading = true;
    this.sentService.getAllSentEmails().subscribe({
      next : (n : any) => {
        // console.log(n);
        this.isLoading = false;
        this.sentEmails = n
      }
    })
  }

}
