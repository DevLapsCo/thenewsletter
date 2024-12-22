import * as GrapesJS from 'grapesjs';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css'; // Import Quill bubble theme CSS
import 'quill/dist/quill.snow.css';   // Import Quill snow theme CSS

export const customQuillRTE = (editor: GrapesJS.Editor) => {
  // Store Quill instances to prevent multiple initializations
  const quillInstances = new WeakMap();

  editor.setCustomRte({
    enable(el: HTMLElement, rte: any) {
      // If already initialized, just focus
      if (quillInstances.has(el)) {
        const existingQuill = quillInstances.get(el);
        existingQuill.focus();
        return existingQuill;
      }

      // Ensure the element is contenteditable
      el.contentEditable = 'true';

      // Create a container for Quill if needed
      const container = document.createElement('div');
      el.appendChild(container);

      // Initialize Quill
      const quill = new Quill(container, {
        theme: 'snow', // You can switch between 'snow' and 'bubble'
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
          ]
        }
      });

      // Set initial content
      quill.root.innerHTML = el.innerHTML;

      // Store the Quill instance
      quillInstances.set(el, quill);

      // Update GrapesJS component when content changes
      quill.on('text-change', () => {
        el.innerHTML = quill.root.innerHTML;
        editor.getSelected()?.set('content', quill.root.innerHTML);
      });

      // Ensure Quill toolbar is positioned correctly
      const toolbarEl = quill.container.querySelector('.ql-toolbar');
      if (toolbarEl) {
        toolbarEl.addEventListener('mousedown', (e) => {
          e.preventDefault(); // Prevent losing focus
        });
      }

      return quill;
    },
    disable(el: HTMLElement, rte: any) {
      if (quillInstances.has(el)) {
        const quill = quillInstances.get(el);
        quill.blur();
        
        // Update the original element with Quill's content
        el.innerHTML = quill.root.innerHTML;
        
        // Remove the Quill container
        const container = el.querySelector('.ql-container');
        if (container) {
          el.removeChild(container);
        }
        
        // Remove the stored instance
        quillInstances.delete(el);
      }
      
      el.contentEditable = 'false';
    },
    getContent(el: HTMLElement, rte: any) {
      return rte?.root?.innerHTML || el.innerHTML;
    }
  });
};