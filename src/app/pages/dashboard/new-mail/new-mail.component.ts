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

@Component({
  selector: 'app-new-mail',
  standalone: true,
  imports: [QuillModule, FormsModule, ChipsModule, EmailChipsComponent, LoaderComponent],
  templateUrl: './new-mail.component.html',
  styleUrl: './new-mail.component.css'
})
export class NewMailComponent implements OnInit{

  sanitizer = inject(DomSanitizer)
  templateService = inject(TemplatesService)
  fileDownloadService = inject(FileService)
  emailService = inject(EmailService)

  ngOnInit(): void {
    this.htmlToText(this.editorContent)
    this.getAllTemplates()
  }

  toEmails = [];
  ccEmails = [];
  bccEmails = [];
  subject! : string;
  templates : Array<any> = []

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

  itemSelected : any = {};

  getData(item : any){
   this.itemSelected = item;
   this.toggleTemaplte()
//    this.fetchFile()
   console.log(this.itemSelected);
   
  }

  // Option 3: Store in a property
  fieldKeys = Object.keys(this.templateFields);

  editorContent = ``;



sanitizedMessage(email: any): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(email);
}

getInnerHTML(val : any){
  return val.replace(/(<([^>]+)>)/ig,'');
}


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

  isLoading = false;

  providerService = inject(ProviderValidationService)
  toaster = inject(CustomToasterService)
  

  sendEmail() {
    console.log(this.templateFields);
    if(this.templateFields != null){
        const id = localStorage.getItem('uid')
        
        if(id != null)
        this.providerService.getAProvider(id).subscribe({
         next: (n :any ) => {
            this.emailService.sendEmail({ templateVariables: this.templateFields, toEmails : this.toEmails, subject : this.subject, fromEmail : n.username, templateFile : this.itemSelected.htmlContent}, id, n.id).subscribe({
                next: (n: any) => {
                    this.toaster.show("success", "Email Sent Successfully!")
                }, 
                error: (e : any) => {
                    this.toaster.show("error", "Email not Successful!")
                }
            })
         }
        })

    }
    
  }
}
