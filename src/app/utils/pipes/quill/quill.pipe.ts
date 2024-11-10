import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Quill from 'quill';

@Pipe({
  name: 'quill',
  standalone: true
})
export class QuillPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(content: string): SafeHtml {
    if (!content) return '';
    const delta = JSON.parse(content);
    const quill = new Quill(document.createElement('div'));
    quill.setContents(delta);
    return this.sanitizer.bypassSecurityTrustHtml(quill.root.innerHTML);
  }
}
