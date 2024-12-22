import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import { ChipsModule } from 'primeng/chips';
import { EmailChipsComponent } from './components/email-input-chips.component';
import { TemplatesService } from '../../../services/templates/templates.service';
import { FileService } from '../../../services/file/file.service';
import { LoaderComponent } from "../../../shared/loader/loader.component";
import { ProviderValidationService } from '../../../services/providerValidation/provider-validation.service';
import { EmailService } from '../../../services/email/email.service';
import { CustomToasterService } from '../../../services/custom-toaster/custom-toaster.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-new-mail',
  standalone: true,
  imports: [  SidebarModule,  NgFor, FormsModule, ChipsModule, EmailChipsComponent, LoaderComponent],
  templateUrl: './new-mail.component.html',
  styleUrl: './new-mail.component.css'
})
export class NewMailComponent implements OnInit{

  sanitizer = inject(DomSanitizer)
  templateService = inject(TemplatesService)
  fileDownloadService = inject(FileService)
  emailService = inject(EmailService)
  route = inject(Router)

  ngOnInit(): void {
    this.getAllTemplates()
  }

  toEmails = [];
  ccEmails = [];
  bccEmails = [];
  subject! : string;
  templates : Array<any> = []

  TemplateSideNav: boolean = false;

  body = "Your Email Goes here"

  isTemplateToggle = false;

  templateFields : any = {}


// In your Angular service or component
// fetchFile() {
//     const fileUrl = this.itemSelected.te;
  
//     fetch(fileUrl)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch the file');
//         }
//         return response.text(); // Or use .json() for JSON, .blob() for binary data
//       })
//       .then(fileContent => {
//         console.log(fileContent);  // Handle the file content
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }
  

   // Option 1: Create a getter method
   get keys() {
    return Object.keys(this.templateFields);
  }

  // Option 2: Create a regular method
  getKeys(json : string) {
    const jsonObject = JSON.parse(JSON.parse(json));    
    return Object.keys(jsonObject);
  }

  getToEmails(item : any){
    this.toEmails = item;
  }
  getToCC(item : any){
    this.ccEmails = item;
  }
  getToBcc(item : any){
    this.bccEmails = item;
  }

  itemSelected : any = null;

  getData(item : any){
   this.itemSelected = item;
   this.toggleTemaplte()
//    this.fetchFile()
   console.log(this.itemSelected);
   
  }

  // Option 3: Store in a property
  fieldKeys = Object.keys(this.templateFields);


// getInnerHTML(val : any){
//   return val.replace(/(<([^>]+)>)/ig,'');
// }


toggleTemaplte(){
    this.isTemplateToggle =! this.isTemplateToggle;
}

getAllTemplates(){
    this.templateService.getAllTemplates().subscribe({
        next: (n : any) => {
            this.templates = n
        }
    })
}

htmlBody! : string;

  // quillConfig = {
  //   modules: {
  //     toolbar: [
  //       ['bold', 'italic', 'underline', 'strike'],
  //       ['blockquote', 'code-block'],
  //       [{ 'header': 1 }, { 'header': 2 }],
  //       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  //       [{ 'color': [] }, { 'background': [] }],
  //       ['link', 'image']
  //     ]
  //   },
  //   formats: [
  //     'bold', 'italic', 'underline', 'strike',
  //     'blockquote', 'code-block',
  //     'header',
  //     'list', 'bullet',
  //     'color', 'background',
  //     'link', 'image'
  //   ]
  // };

  onEditorCreated(quill: any) {
    // console.log('Editor created', quill);
  }

  onContentChanged(html : any ) {
    // this.htmlBody = html.html;
    // console.log(this.templateFields);
    
    // console.log('Content changed', html);
  }

  onSelectionChanged( range : any ) {
    // console.log('Selection changed', range);
  }


 

  isLoading = false;

  providerService = inject(ProviderValidationService)
  toaster = inject(CustomToasterService)

 
  // Replace placeholders dynamically based on data fields
//   generateHtmlContent(template: string, data: Record<string, any>): string {
//     return template.replace(/\$\{(.*?)\}/g, (_, key) => data[key] || '');
//   }

  // Sanitize and return the final content
  sanitizedMessage(): SafeHtml {
    // const content = this.generateHtmlContent(this.itemSelected.htmlContent, this.itemSelected.templa);
    return this.sanitizer.bypassSecurityTrustHtml(this.itemSelected.htmlContent);
  }


  sendEmail() {
    console.log(this.templateFields);
    
    if( this.itemSelected == null){
      this.toaster.show("error", "Select a template!")
    } else if(this.subject == null) {
      this.toaster.show("error", "Add a Subject!")
    } else if(this.toEmails.length == 0) {
      this.toaster.show("error", "Add a Your recepient!")
    } 
    else {
      const id = localStorage.getItem('uid')
      this.isLoading = true;
      if(id != null)
      this.emailService.sendEmail({ templateVariables: this.templateFields, toEmails : this.toEmails, subject : this.subject, templateFile : this.itemSelected.templateKeyName}, id).subscribe({
        next: (n: any) => {
            this.isLoading = false;
            this.route.navigate(['/dashboard/sent'])
            this.toaster.show("success", "Email Sent Successfully!")
        }, 
        error: (e : any) => {
            this.isLoading = false;
            this.toaster.show("error", "Email not Successful!")
        }
    })
    }
    
  }
}
