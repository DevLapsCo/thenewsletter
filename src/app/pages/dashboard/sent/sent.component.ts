import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormatDatePipe } from '../../../shared/tiome-format/time-format.pipe';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EmailService } from '../../../services/email/email.service';
import { ImplicitReceiver } from '@angular/compiler';

@Component({
  selector: 'app-sent',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormatDatePipe, RouterLink],
  templateUrl: './sent.component.html',
  styleUrl: './sent.component.css',
})
export class SentComponent implements OnInit{
[x: string]: any;

ngOnInit(): void {
  this.getAllSentEmails()
}

  sentEmails : Array<any> = [];



   htmlToText(html: string): string {
    const tempDiv = document.createElement('p');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  sentService = inject(EmailService)

  getAllSentEmails(){
    this.sentService.getAllSentEmails().subscribe({
      next : (n : any) => {
        console.log(n);
        this.sentEmails = n
      }
    })
  }

}
