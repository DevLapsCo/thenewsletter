// add-templates.component.ts
import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, inject, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeyValuePair, TemplateVariable } from '../../../utils/constants/newsletter.interface';
import { TemplatesService } from '../../../services/templates/templates.service';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SuccessDialogComponent } from '../../../shared/dialogs/success-dialog/success-dialog.component';
import { CustomToasterService } from '../../../services/custom-toaster/custom-toaster.service';
import { LoaderComponent } from "../../../shared/loader/loader.component";

@Component({
  selector: 'app-add-templates',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor, FormsModule, LoaderComponent],
  templateUrl: './add-templates.component.html',
  styleUrl: './add-templates.component.css'
})
export class AddTemplatesComponent implements AfterViewInit {
  @ViewChild('iframe') iframe!: ElementRef;
  selectedFile: File | null = null;
  samplePicture: File | null = null;
  fileContent: string = '';
  fileSelected = false;
  Loading = false;
  dynamicForm: FormGroup;
  sanitizer = inject(DomSanitizer);
  templateService = inject(TemplatesService);
  toaster = inject(CustomToasterService)

  constructor(private fb: FormBuilder) {
    this.dynamicForm = this.fb.group({
      fields: this.fb.array([])
    });
  }

  private _snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.addField(); // Add initial field
  }

  ngAfterViewInit() {
    if (this.fileContent) {
      this.setIframeContent();
    }
  }

  private setIframeContent() {
    if (!this.iframe) return;

    const iframe = this.iframe.nativeElement;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    // Write the content to the iframe
    doc.open();
    doc.write(this.fileContent);
    doc.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.readFileContent();
    }
  }

  onSamplePictureSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.samplePicture = input.files[0];
      this.readFileContent();
    }
  }

  readFileContent(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.fileContent = e.target?.result as string;
        this.fileSelected = true;
        // Wait for next tick to ensure iframe is available
        setTimeout(() => {
          this.setIframeContent();
        }, 0);
      };

      reader.readAsText(this.selectedFile);
    }
  }

  // Form Array Methods
  get fields() {
    return this.dynamicForm.get('fields') as FormArray;
  }

  createField(): FormGroup {
    return this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  addField() {
    this.fields.push(this.createField());
  }

  removeField(index: number) {
    if (this.fields.length > 1) {
      this.fields.removeAt(index);
    }
  }
  
  templateVariables : any;


  onSubmit() {
    if (this.dynamicForm.valid) {
      this.Loading = true;
      // Convert form array to object first
      const keyValuePairs = this.fields.value.reduce((acc: any, field: KeyValuePair) => {
        acc[field.key] = field.value;
        return acc;
      }, {});
      console.log('Form Values:', keyValuePairs);
      
      // Convert the object to a Map for templateVariables
      this.templateVariables = JSON.stringify(keyValuePairs);
      
      // Here you can add logic to replace placeholders in the HTML content
      let updatedContent = this.fileContent;
      Object.entries(keyValuePairs).forEach(([key, value]) => {
        const placeholder = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
        updatedContent = updatedContent.replace(placeholder, value as string);
      });
      
      // Update the iframe with the new content
      this.fileContent = updatedContent;
      this.setIframeContent();
      this.addTemplate();
    }
  }
  title = "New Template";
  
  
  addTemplate(){
    this.Loading = true;
    var payload = {
      templateVariables: JSON.stringify(this.templateVariables),
      templateFile : this.selectedFile,
      templateKeyName: this.selectedFile?.name,
      title: this.title,
      samplePicture: this.samplePicture,
      sampleKeyName: this.samplePicture?.name,
      htmlContent: this.fileContent
    }
    
    console.log(JSON.stringify(this.templateVariables), this.templateVariables);
    
    
    this.templateService.addTemplate(payload).subscribe({
      next: (n : any) => {
        this.Loading = false;
        this.toaster.show("success", "Template added Successfully: ")
        
        this.dynamicForm.setValue([""])
        this.selectedFile = null;
        this.samplePicture = null;
        this.fileContent = ""
      }, 
      error: (e) => {
        this.Loading = false;
        this.toaster.show("error", "Not Successfull: " + e)
      }
    })
  }

  removeFile(): void {
    this.selectedFile = null;
    this.fileContent = '';
    this.fileSelected = false;
  }

  getFileSize(): string {
    if (this.selectedFile) {
      const sizeInKB = Math.round(this.selectedFile.size / 1024);
      return `${sizeInKB} KB`;
    }
    return '';
  }
 
  removeSamplePicture(): void {
    this.samplePicture = null;
    this.fileContent = '';
    this.fileSelected = false;
  }

  getSampleFileSize(): string {
    if (this.selectedFile) {
      const sizeInKB = Math.round(this.selectedFile.size / 1024);
      return `${sizeInKB} KB`;
    }
    return '';
  }

  sanitizedMessage(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}