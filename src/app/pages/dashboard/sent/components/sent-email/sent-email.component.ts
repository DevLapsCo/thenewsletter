import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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

  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute);
  private emailService = inject(EmailService);

  @ViewChild('emailIframe') iframe!: ElementRef<HTMLIFrameElement>;
  
  email: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params: any) => {
        if (params.id) {
          this.emailService.getSentEmail(params.id).subscribe({
            next: (emailData: any) => {
              this.email = emailData;
              // Wait for next tick to ensure iframe is available
              setTimeout(() => this.updateIframeContent(), 0);
            }
          });
        }
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.email?.htmlContent) {
      this.updateIframeContent();
    }
  }

  private updateIframeContent(): void {
    if (!this.iframe?.nativeElement || !this.email?.htmlContent) {
      return;
    }

    try {
      const iframeDoc = this.iframe.nativeElement.contentDocument || 
                       (this.iframe.nativeElement.contentWindow?.document);
      
      if (!iframeDoc) {
        console.error('Could not access iframe document');
        return;
      }

      // Create a base tag to handle relative URLs if needed
      const baseUrl = window.location.origin;
      
      // Construct the full HTML document with proper DOCTYPE and meta tags
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <base href="${baseUrl}">
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { 
                margin: 0; 
                padding: 16px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              }
              img { max-width: 100%; height: auto; }
            </style>
          </head>
          <body>
            ${this.email.htmlContent}
          </body>
        </html>
      `;

      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();

      // Adjust iframe height to content if needed
      this.iframe.nativeElement.onload = () => {
        const body = iframeDoc.body;
        const html = iframeDoc.documentElement;
        if (body && html) {
          const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          );
          this.iframe.nativeElement.style.height = `${height}px`;
        }
      };
    } catch (error) {
      console.error('Error updating iframe content:', error);
    }
  }

  sanitizedMessage(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
