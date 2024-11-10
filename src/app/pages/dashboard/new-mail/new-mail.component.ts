import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import { ChipsModule } from 'primeng/chips';
import { EmailChipsComponent } from './components/email-input-chips.component';

@Component({
  selector: 'app-new-mail',
  standalone: true,
  imports: [QuillModule, FormsModule, ChipsModule, EmailChipsComponent],
  templateUrl: './new-mail.component.html',
  styleUrl: './new-mail.component.css'
})
export class NewMailComponent implements OnInit{

  sanitizer = inject(DomSanitizer)

  ngOnInit(): void {
    this.htmlToText(this.editorContent)
  }

  toEmails = [];
  ccEmails = [];
  bccEmails = [];

  templateFields : any = {
    'section' : 'data',
    'head' : `some head`
  }

   // Option 1: Create a getter method
   get keys() {
    return Object.keys(this.templateFields);
  }

  // Option 2: Create a regular method
  getKeys() {
    return Object.keys(this.templateFields);
  }

  // Option 3: Store in a property
  fieldKeys = Object.keys(this.templateFields);

  editorContent = `
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        /* Reset styles */
        body, #bodyTable {
            height: 100% !important;
            width: 100% !important;
            margin: 0;
            padding: 0;
        }
        
        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        
        img, a img {
            border: 0;
            height: auto;
            outline: none;
            text-decoration: none;
        }
        
        /* Base styles */
        body {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        
        /* Main container */
        .emailBody {
            background-color: #f7f7f7;
            width: 100%;
        }
        
        /* Content container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        /* Header styles */
        .header {
            padding: 20px;
            text-align: center;
            background-color: #ffffff;
            border-bottom: 1px solid #eeeeee;
        }
        
        /* Content styles */
        .content {
            padding: 40px 20px;
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
        }
        
        /* Footer styles */
        .footer {
            padding: 20px;
            text-align: center;
            background-color: #f7f7f7;
            color: #666666;
            font-size: 12px;
        }
        
        .social-links {
            padding: 20px 0;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #666666;
            text-decoration: none;
        }
        
        .footer-links {
            padding: 10px 0;
        }
        
        .footer-links a {
            color: #666666;
            text-decoration: none;
            margin: 0 10px;
        }
        
        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .container {
                width: 100% !important;
            }
            
            .content {
                padding: 20px !important;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="emailBody">
        <tr>
            <td align="center" valign="top">
                <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="container">
                    <!-- Header -->
                    <tr>
                        <td class="header">
                            <img src="/api/placeholder/150/50" alt="Company Logo" width="150" style="max-width: 150px;">
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="content">
                            <!-- Content goes here -->
                            <h1 style="margin-top: 0; color: #333333;">Welcome!</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            
                            <!-- Call to Action Button -->
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <table role="presentation" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="border-radius: 4px; background-color: #007bff; text-align: center; padding: 12px 24px;">
                                                    <a href="#" style="color: #ffffff; text-decoration: none; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold;">Call to Action</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="footer">
                            <!-- Social Links -->
                            <div class="social-links">
                                <a href="#" target="_blank">Facebook</a>
                                <a href="#" target="_blank">Twitter</a>
                                <a href="#" target="_blank">LinkedIn</a>
                                <a href="#" target="_blank">Instagram</a>
                            </div>
                            
                            <!-- Footer Links -->
                            <div class="footer-links">
                                <a href="#" target="_blank">Privacy Policy</a>
                                <a href="#" target="_blank">Terms of Service</a>
                                <a href="#" target="_blank">Unsubscribe</a>
                            </div>
                            
                            <!-- Company Info -->
                            <p style="margin-top: 20px;">
                                © 2024 Your Company Name. All rights reserved.<br>
                                123 Business Street, Suite 100, City, Country 12345
                            </p>
                            
                            <!-- Unsubscribe Notice -->
                            <p style="color: #999999; font-size: 11px; margin-top: 20px;">
                                You received this email because you signed up for updates from Your Company Name.<br>
                                If you wish to unsubscribe, <a href="#" style="color: #999999;">click here</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;


sanitizedMessage(email: any): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(email);
}

getInnerHTML(val : any){
  return val.replace(/(<([^>]+)>)/ig,'');
}

  quillConfig = {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image']
      ]
    },
    formats: [
      'bold', 'italic', 'underline', 'strike',
      'blockquote', 'code-block',
      'header',
      'list', 'bullet',
      'color', 'background',
      'link', 'image'
    ]
  };

  onEditorCreated(quill: any) {
    console.log('Editor created', quill);
  }

  onContentChanged(html : any ) {
    console.log('Content changed', html);
  }

  onSelectionChanged( range : any ) {
    console.log('Selection changed', range);
  }

  rawHTML = {
    html: this.editorContent,
    text: this.editorContent
  }

  sameData(){
    this.rawHTML.html = ''
  }

  htmlToText(html: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  // Tesr
  
}
