import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import emailPlugin from 'grapesjs-preset-newsletter';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserTemplatesService } from '../../../services/user-templates/user-templates.service';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, firstValueFrom, takeUntil } from 'rxjs';
import { Template } from '../../../utils/constants/newsletter.interface';
import { SkeletonModule } from 'primeng/skeleton';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { SendEmailsV2Service } from '../../../services/send-email-v2/send-emails-v2.service';

@Component({
  selector: 'app-email-builder',
  standalone: true,
  imports: [CommonModule, SkeletonModule, RouterOutlet, FormsModule, MatProgressSpinnerModule, RouterLink, RouterLinkActive],
  templateUrl: 'email-builder.component.html',
  styleUrls: ['email-builder.component.css']
})
export class EmailBuilderComponent implements OnInit, AfterViewInit {
  private editor: any;
  activePanel: 'blocks' | 'layers' | 'styles' | 'settings' = 'blocks';
  isAutosaveEnabled: boolean = true;

  userTemplateService = inject(UserTemplatesService)
  route = inject(ActivatedRoute)
  sendEmailServiceV2 = inject(SendEmailsV2Service)
  snackBar = inject(MatSnackBar)

  templateId! : string
  userId! : string;
  template : any;

  savingTemplate = signal(false)
  showSavingIndicator = signal(false);

    // Subject for handling name changes
    private nameChange$ = new Subject<string>();
    // Subject for cleanup
    private destroy$ = new Subject<void>();

    constructor() {
      this.nameChange$
        .pipe(
          debounceTime(5000),
          takeUntil(this.destroy$)
        )
        .subscribe(newName => {
          if (this.template) {
            this.savingTemplate.set(true);
            // this.showSavingIndicator.set(true);
            
            const updatePayload = {
              id: this.template.id,
              name: newName,
              userId: this.template.userId,
              ...this.template
            };
            
            this.userTemplateService.updateTemplate(updatePayload).subscribe({
              next: (updatedTemplate: any) => {
                this.template = updatedTemplate;
                this.savingTemplate.set(false);
                
                // Keep showing the "Saved!" message for a moment
                setTimeout(() => {
                  this.savingTemplate.set(false);
                }, 1000);
              },
              error: (error) => {
                console.error('Error updating template name:', error);
                this.savingTemplate.set(false);
                this.showSavingIndicator.set(false);
              }
            });
          }
        });
    }

  ngOnInit(): void {
    this.initGrapes();
    const uid = sessionStorage.getItem("uid");
    if (uid) {
      this.userId = uid;
      this.pageHasTemplateId();
    }
  }
  
  ngOnDestroy() {
    // Cleanup
    this.destroy$.next();
    this.destroy$.complete();

    if (this.editor) {
      this.editor.destroy();
    }
  
  }


  ngAfterViewInit(): void {
    // Additional setup if needed
  }

  private loadTemplate() {
    if (this.templateId && this.userId) {
      this.showSavingIndicator.set(true)
      this.userTemplateService.loadTemplateToPage(this.templateId, this.userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (template: Template) => {
            this.showSavingIndicator.set(false)
            this.template = template;
            // console.log( template);
            if(template != null)
            this.setEditorContent(template.html, template.css)
          },
          error: (error) => {
            console.error('Error loading template:', error);
            this.snackBar.open('Message archived', 'Undo', {
              duration: 3000
            });
          }
        });
    }
  }

  updateNameAfterChangeDetection() {
    if (this.template?.name) {
      this.nameChange$.next(this.template.name);
    }
  }

  setEditorContent(html: string, css: string) {
    this.editor.setComponents(html);
    this.editor.setStyle(css);
  }

  sendTest(){

    var payload = {
      userId: this.userId,
      templateId: this.templateId
    }

    this.savingTemplate.set(true)
    this.sendEmailServiceV2.sendTest(payload).subscribe({
      next: (n :any) => {
        this.savingTemplate.set(false)
        this.snackBar.open('Test Sent Successfully!', 'Undo', {
          duration: 3000
        });
      },
      error: (e : any) => {
        this.savingTemplate.set(false)
        this.snackBar.open('An Error occured!', 'Undo', {
          duration: 3000
        });
      }
    })
  }

  pageHasTemplateId() {
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)  // Clean up subscription
    ).subscribe({
      next: (params) => {
        const tempId = params['tempId'];
        if (tempId) {
          this.templateId = tempId;
          this.loadTemplate();
        }
      }
    });
  }


  initGrapes(){
    this.editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs',
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      height: '100%',
      width: '100%',
      layerManager: {
        appendTo: '.layers-container',
      },
      
      // Local Storage
      storageManager: {
        type: 'remote',
        stepsBeforeSave: 3,
        options: {
          remote: {
            urlLoad: `${this.userTemplateService.API_PATH}/temp`,
            urlStore: `${this.userTemplateService.API_PATH}/updateBuilder`,
            
            onStore: async (data: any) => {
              this.silentUpdate()
            },

            onLoad: async () => {}
          }
        }
      },

      // Storing data remotely
      // storageManager: {
      //   type: 'remote',
      //   // ...
      //   stepsBeforeSave: 10,
      //   options: {
      //     remote: {
      //       headers: {}, // Custom headers for the remote storage request
      //       urlStore: 'https://your-server/endpoint/store', // Endpoint URL where to store data project
      //       urlLoad: 'https://your-server/endpoint/load', // Endpoint URL where to load data project
      //     },
      //   },
      // },

      

      // Avoid any default panel
      panels: {
        defaults: [
          {
            id: 'layers',
            el: '.panel__right',
            // Make the panel resizable
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: false, // Top handler
              cl: true, // Left handler
              cr: false, // Right handler
              bc: false, // Bottom handler
              // Being a flex child we need to change `flex-basis` property
              // instead of the `width` (default)
              keyWidth: 'flex-basis',
            },
          },
          {
            id: 'panel-switcher',
            el: '.panel__switcher',
            buttons: [
              {
                id: 'show-blocks',
                active: true,
                label: `<i class='material-symbols-outlined'>add_row_below</i>`,
                command: 'show-blocks',
                togglable: false,
              },
              {
                id: 'show-layers',
                active: true,
                label: `<i class='material-symbols-outlined'>stacks</i>`,
                command: 'show-layers',
                // Once activated disable the possibility to turn it off
                togglable: false,
              },
              {
                id: 'show-style',
                active: true,
                label: `<i class='material-symbols-outlined'>brush</i>`,
                command: 'show-styles',
                togglable: false,
              },
              {
                id: 'show-traits',
                active: true,
                label: `<i class='material-symbols-outlined'>settings</i>`,
                command: 'show-traits',
                togglable: false,
              },
              
              
            ],
          },
          {
            id: 'panel-devices',
            el: '.panel__devices',
            buttons: [
              {
                id: 'device-desktop',
                label: `<i class='material-symbols-outlined'>computer</i>`,
                command: 'set-device-desktop',
                active: true,
                togglable: false,
              },
              {
                id: 'device-mobile',
                label: `<i class='material-symbols-outlined'>smartphone</i>`,
                command: 'set-device-mobile',
                togglable: false,
              },
            ],
          },
        ],
      },
      deviceManager: {
        devices: [
          {
            name: 'Desktop',
            width: '', // default size
          },
          {
            name: 'Mobile',
            width: '320px', // this value will be used on canvas width
            widthMedia: '480px', // this value will be used in CSS @media
          },
        ],
      },
      
      traitManager: {
        appendTo: '.traits-container',
      },
      selectorManager: {
        appendTo: '.styles-container',
      },
      styleManager: {
        appendTo: '.styles-container',
        sectors: [
          {
            name: 'Dimension',
            open: false,
            // Use built-in properties
            buildProps: ['width', 'min-height', 'padding'],
            // Use `properties` to define/override single property
            properties: [
              {
                // Type of the input,
                // options: integer | radio | select | color | slider | file | composite | stack
                type: 'integer',
                name: 'The width', // Label for the property
                property: 'width', // CSS property (if buildProps contains it will be extended)
                units: ['px', '%'], // Units, available only for 'integer' types
                defaults: 'auto', // Default value
                min: 0, // Min value, available only for 'integer' types
              },
            ],
          },
          {
            name: 'Extra',
            open: false,
            buildProps: ['background-color', 'box-shadow', 'custom-prop'],
            properties: [
              {
                id: 'custom-prop',
                name: 'Custom Label',
                property: 'font-size',
                type: 'select',
                defaults: '32px',
                // List of options, available only for 'select' and 'radio'  types
                options: [
                  { value: '12px', name: 'Tiny' , id : ''},
                  { value: '18px', name: 'Medium', id : '' },
                  { value: '32px', name: 'Big', id: '' },
                ],
              },
            ],
          },
        ],
      },
      
      blockManager: {
        appendTo: '.block-container',
        blocks: [
          // Structure Blocks
          {
            id: 'section', 
            label: `
              <div style='display:flex; flex-direction:column; gap:10px;'>
                <span class='material-symbols-outlined'>subheader</span>
                <span style='font-size:15px'>Section</span>
                <span style='transform: rotate(90deg)' class='material-symbols-outlined'>drag_indicator</span>
              </div>
            `, 
            attributes: { class: 'gjs-block-section' },
            content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding: 20px;">
                  <h1 style="margin: 0; color: #333333; font-family: Arial, sans-serif;">Section Title</h1>
                  <p style="margin: 10px 0 0; color: #666666; font-family: Arial, sans-serif;">Section description or content goes here.</p>
                </td>
              </tr>
            </table>`,
          },
          {
            id: 'text',
            label: `
              <div style='display:flex; flex-direction:column; gap:10px;'>
                <span class='material-symbols-outlined'>title</span>
                <span style='font-size:15px'>Text</span>
                <span style='transform: rotate(90deg)' class='material-symbols-outlined'>drag_indicator</span>
              </div>
            `,
            content: {
              type: 'text',
              content: 'Insert your text here',
              style: {
                'font-family': 'Arial, sans-serif',
                'color': '#333333',
                'padding': '10px'
              },
              removable: true,  // Explicitly make it removable
              draggable: true,  // Ensure it can be dragged
              droppable: false  // Prevent other elements from being dropped inside
            }
          },
          {
            id: 'space-component',
            label: `
              <div style='display:flex; flex-direction:column; gap:10px;'>
                <span class='material-symbols-outlined'>height</span>
                <span style='font-size:15px'>Spacer</span>
                <span style='transform: rotate(90deg)' class='material-symbols-outlined'>drag_indicator</span>
              </div>
            `,
            content: {
              type: 'div',
              content: `
                <div style='height: 20px;'>
                </div>
              `,
              // Custom attributes for dynamic spacing
              // Make it easily editable
              removable: true,
              draggable: true,
              // Allow inline editing of height and color
              editable: true
            }
          },
          {
            id: 'image',
            label: `
              <div style='display:flex; flex-direction:column; gap:10px;'>
                <span class='material-symbols-outlined'>image</span>
                <span style='font-size:15px'>Image</span>
                <span style='transform: rotate(90deg)' class='material-symbols-outlined'>drag_indicator</span>
              </div>
            `,
            content: { type: 'image' },
            select: true,
            activate: true,
          },
        
          // Email-Specific Blocks
          {
            id: 'email-header',
            label: `
              <div style='display:flex; flex-direction:column; gap:10px;'>
                <span class='material-symbols-outlined'>page_header</span>
                <span style='font-size:15px'>Email Header</span>
                <span style='transform: rotate(90deg)' class='material-symbols-outlined'>drag_indicator</span>
              </div>
            `,
            content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F4F4F4;">
              <tr>
                <td align="center" style="padding: 20px;">
                  <h1 style="margin: 0; color: #333333; font-family: Arial, sans-serif;">Your Company Name</h1>
                  <p style="margin: 10px 0 0; color: #666666; font-family: Arial, sans-serif;">Email Subtitle or Preheader</p>
                </td>
              </tr>
            </table>`,
          },
          {
            id: 'hero-image',
            label: `
              <div style='display:flex; flex-direction:column; gap:10px;'>
                <span class='material-symbols-outlined'>landscape</span>
                <span style='font-size:15px'>Hero Image</span>
                <span style='transform: rotate(90deg)' class='material-symbols-outlined'>drag_indicator</span>
              </div>
            `,
            content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td align="center" style="padding: 0;">
                  <img src="/api/placeholder/600/400" alt="Hero Image" width="600" style="max-width: 100%; height: auto; display: block;">
                </td>
              </tr>
            </table>`,
          },
          {
            id: 'two-column',
            label: `
              <div style='display:flex; flex-direction:column; gap:10px;'>
                <span class='material-symbols-outlined'>view_column</span>
                <span style='font-size:15px'>Two Column</span>
                <span style='transform: rotate(90deg)' class='material-symbols-outlined'>drag_indicator</span>
              </div>
            `,
            content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td width="50%" style="padding: 10px; vertical-align: top;">
                  <h2 style="margin: 0 0 10px; color: #333333; font-family: Arial, sans-serif;">Left Column</h2>
                  <p style="margin: 0; color: #666666; font-family: Arial, sans-serif;">Content for the left column</p>
                </td>
                <td width="50%" style="padding: 10px; vertical-align: top;">
                  <h2 style="margin: 0 0 10px; color: #333333; font-family: Arial, sans-serif;">Right Column</h2>
                  <p style="margin: 0; color: #666666; font-family: Arial, sans-serif;">Content for the right column</p>
                </td>
              </tr>
            </table>`,
          },
          {
            id: 'button',
            label: `
              <div style='display:flex; flex-direction:column; gap:10px;'>
                <span class='material-symbols-outlined'>ads_click</span>
                <span style='font-size:15px'>CTA Button</span>
                <span style='transform: rotate(90deg)' class='material-symbols-outlined'>drag_indicator</span>
              </div>
            `,
            content: `<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 20px 0;">
              <tr>
                <td style="border-radius: 5px; background-color: #007bff;">
                  <a href="#" style="font-family: Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; display: inline-block; padding: 12px 25px; border-radius: 5px;">Call to Action</a>
                </td>
              </tr>
            </table>`,
          },
          {
            id: 'divider',
            label: `
              <div style='display:flex; flex-direction:column; gap:10px;'>
                <span class='material-symbols-outlined'>horizontal_rule</span>
                <span style='font-size:15px'>Divider</span>
                <span style='transform: rotate(90deg)' class='material-symbols-outlined'>drag_indicator</span>
              </div>
            `,
            content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td height="1" style="background-color: #E0E0E0; line-height: 1px; font-size: 0;">&nbsp;</td>
              </tr>
            </table>`,
          },
          {
            id: 'social-icons',
            label: `
              <div style='display:flex; flex-direction:column; gap:10px;'>
                <span class='material-symbols-outlined'>share</span>
                <span style='font-size:15px'>Social Icons</span>
                <span style='transform: rotate(90deg)' class='material-symbols-outlined'>drag_indicator</span>
              </div>
            `,
            content: `<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 20px 0;">
              <tr>
                <td style="padding: 0 10px;">
                  <a href="#" style="text-decoration: none;">
                    <img src="/api/placeholder/30/30" alt="Facebook" width="30" height="30">
                  </a>
                </td>
                <td style="padding: 0 10px;">
                  <a href="#" style="text-decoration: none;">
                    <img src="/api/placeholder/30/30" alt="Twitter" width="30" height="30">
                  </a>
                </td>
                <td style="padding: 0 10px;">
                  <a href="#" style="text-decoration: none;">
                    <img src="/api/placeholder/30/30" alt="LinkedIn" width="30" height="30">
                  </a>
                </td>
              </tr>
            </table>`,
          },
          {
            id: 'footer',
            label: `
              <div style='display:flex; flex-direction:column; gap:10px;'>
                <span class='material-symbols-outlined'>page_footer</span>
                <span style='font-size:15px'>Email Footer</span>
                <span style='transform: rotate(90deg)' class='material-symbols-outlined'>drag_indicator</span>
              </div>
            `,
            content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F4F4F4;">
              <tr>
                <td align="center" style="padding: 20px; font-family: Arial, sans-serif; color: #666666; font-size: 12px;">
                  <p style="margin: 0;">© 2024 Your Company Name. All rights reserved.</p>
                  <p style="margin: 10px 0 0;">
                    <a href="#" style="color: #666666; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
                    <a href="#" style="color: #666666; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                  </p>
                </td>
              </tr>
            </table>`,
          },
        ],
      },
    });

    this.editor.on('change:changesCount', () => {
      const changesCount = this.editor.getDirtyCount();
      if (changesCount >= 3) {  // Same as stepsBeforeSave
        this.editor.store();
      }
    });

    // Store and Load Data

    this.editor.BlockManager.add('my-block-id', {
      // ...
      content: {
        tagName: 'div',
        draggable: true,
        attributes: { 'some-attribute': 'some-value' },
        components: [
          {
            tagName: 'span',
            content: '<b>Some static content</b>',
          },
          {
            tagName: 'div',
            // use `content` for static strings, `components` string will be parsed
            // and transformed in Components
            components: '<span>HTML at some point</span>',
          },
        ],
      },
    });

    this.editor.Panels.addPanel({
      id: 'panel-top',
      el: '.panel__top',
    });
    this.editor.Panels.addPanel({
      id: 'basic-actions',
      el: '.panel__basic-actions',
      buttons: [
        {
          id: 'visibility',
          active: true, // active by default
          className: 'btn-toggle-borders',
          label: `<i class='material-symbols-outlined'>border_clear</i>`,
          command: 'sw-visibility', // Built-in command
        },
        {
          id: 'export',
          className: 'btn-open-export',
          label: `<i class='material-symbols-outlined'>code_blocks</i>`,
          command: 'export-template',
          context: 'export-template', // For grouping context of buttons from the same panel
        },
        {
          id: 'show-json',
          className: 'btn-show-json',
          label: `<i class='material-symbols-outlined'>data_object</i>`,
          context: 'show-json',
          command(editor : any) {
            editor.Modal.setTitle('Components JSON')
              .setContent(
                `<textarea style="width:100%; height: 250px;">
                ${JSON.stringify(editor.getComponents())}
              </textarea>`,
              )
              .open();
          },
        },
      ],
    });

    this.editor.on('run:export-template:before', (opts : any) => {
      console.log('Before the command run');
      if (0 /* some condition */) {
        opts.abort = 1;
      }
    });
    this.editor.on('run:export-template', () => console.log('After the command run'));
    this.editor.on('abort:export-template', () => console.log('Command aborted'));
    

    // Device Responsivity
    // Commands
    this.editor.Commands.add('set-device-desktop', {
    run: (editor:any) => editor.setDevice('Desktop'),
    });
    this.editor.Commands.add('set-device-mobile', {
    run: (editor:any) => editor.setDevice('Mobile'),
    });

    // Layers and Others
    this.editor.Commands.add('show-layers', {
      getRowEl(editor:any) {
        return editor.getContainer().closest('.editor-row');
      },
      getLayersEl(row:any) {
        return row.querySelector('.layers-container');
      },
    
      run(editor : any, sender : any) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = '';
      },
      stop(editor:any, sender:any) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = 'none';
      },
    });
    this.editor.Commands.add('show-styles', {
      getRowEl(editor:any) {
        return editor.getContainer().closest('.editor-row');
      },
      getStyleEl(row:any) {
        return row.querySelector('.styles-container');
      },
    
      run(editor:any, sender:any) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = '';
      },
      stop(editor:any, sender:any) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = 'none';
      },
    });
    this.editor.Commands.add('show-blocks', {
      getRowEl(editor:any) {
        return editor.getContainer().closest('.editor-row');
      },
      getBlockEl(row:any) {
        return row.querySelector('.block-container');
      },
     
      run(editor:any, sender:any) {
        const blockEl = this.getBlockEl(this.getRowEl(editor));
        blockEl.style.display = '';
      },
      stop(editor:any, sender:any) {
        const blockEl = this.getBlockEl(this.getRowEl(editor));
        blockEl.style.display = 'none';
      },
    });

    this.editor.Commands.add('undo', {
      run: (editor:any) => {
        editor.UndoManager.undo();
      }
    });
    
    // Redo last undone action
    this.editor.Commands.add('redo', {
      run: (editor:any) => {
        editor.UndoManager.redo();
      }
    });

    
    
  }


  clearEditor(){
    this.editor.Components.clear()
  }
  

  saveTemplate() {
    const html = this.editor.getHtml();
    const css = this.editor.getCss();
    
    const completeHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
</body>
</html>
    `.trim();

    localStorage.setItem('emailTemplate', completeHtml);

    this.template.htmlBody = completeHtml;
    this.template.html = html;
    this.template.css = css;

    console.log(this.template);

    this.savingTemplate.set(true)
    
    
    this.userTemplateService.updateTemplate(this.template).subscribe({
      next: (n : any) => {
        this.savingTemplate.set(false)
        this.snackBar.open(this.template.name + " saved successfully!", "Ok", {
          duration: 10000
        });
      } ,
      error: (e : any) => {
        this.savingTemplate.set(false)
        this.snackBar.open("Saving" + this.template.name + "not successfully!", "Ok", {
          duration: 10000
        });
      }
    })
     
  }
 
 
  silentUpdate() {
    const html = this.editor.getHtml();
    const css = this.editor.getCss();
    
    const completeHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
</body>
</html>
    `.trim();

    localStorage.setItem('emailTemplate', completeHtml);
    
    this.template.htmlBody = completeHtml;
    this.template.html = html;
    this.template.css = css;
    
    console.log(this.template);
    this.savingTemplate.set(true)
    

    this.userTemplateService.updateTemplate(this.template).subscribe({
      next: (n : any) => {
        this.savingTemplate.set(false)
      } ,
      error: (e : any) => {
        this.savingTemplate.set(false);
      }
    })
     
  }

  toggleROutlet = false;

  toggleRouterOutlet(){
    this.toggleROutlet = !this.toggleROutlet;
  }
}