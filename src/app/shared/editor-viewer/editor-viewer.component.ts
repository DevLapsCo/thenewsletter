import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import grapesjs from 'grapesjs';
import { UserTemplatesService } from '../../services/user-templates/user-templates.service';
import 'grapesjs/dist/css/grapes.min.css';

@Component({
  selector: 'app-editor-viewer',
  standalone: true,
  imports: [],
  templateUrl: './editor-viewer.component.html',
  styleUrl: './editor-viewer.component.css'
})
export class EditorViewerComponent implements OnInit, OnChanges {

  @Input() templateId!: string;
  @Input() template : any
  @Output() updatedTemplate : EventEmitter<any> = new EventEmitter();

  private editor: any;
  userTemplateService = inject(UserTemplatesService);

  ngOnInit() {
    this.initializeViewer();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['template'] && 
        changes['template'].currentValue) {
      const template = changes['template'].currentValue;
      this.setEditorContent(template.html, template.css);
    }
  }


  setEditorContent(html: string, css: string) {
    if (this.editor) {
      this.editor.setComponents(html);
      this.editor.setStyle(css);
      
      // Refresh the editor view
      this.editor.refresh();
      
      // Reset undo/redo stack if needed
      this.editor.UndoManager?.clear();
    }
  }
  

  private async initializeViewer() {
    // Initialize GrapesJS in preview mode
    this.editor = grapesjs.init({
      container: '#template-preview',
      fromElement: true,
      // Size of the editor
      height: '100%',
      width: '100%',
      // Disable the storage manager for the moment
      storageManager: false,
      // Avoid any default panel
      panels: { defaults: [] },
      
    });

    // Load the template content
    if (this.templateId) {
      this.loadTemplate();
    }
  }

  private loadTemplate() {
    this.userTemplateService.loadTemplate(this.templateId).subscribe({
      next: (template : any) => {
        if (this.editor) {
          // Set the content
          this.editor.setComponents(template.html || '');
          this.editor.setStyle(template.css || '');
          
          // Force refresh of the canvas
          this.editor.refresh();
          
          // Disable all component selection
          this.editor.getModel().getComponents().each((component: any) => {
            component.set('selectable', false);
            component.set('hoverable', false);
            component.set('draggable', false);
            component.set('droppable', false);
            component.set('editable', false);
          });
        }
      },
      error: (error :any) => {
        console.error('Error loading template:', error);
      }
    });
  }

  // Update content from outside
  updateContent(html: string, css: string) {
    if (this.editor) {
      this.editor.setComponents(html);
      this.editor.setStyle(css);
      this.editor.refresh();
    }
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

}
