import { inject } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

export function sanitizedMessage(email: any): SafeHtml {
    var sanitizer = inject(DomSanitizer)
    return sanitizer.bypassSecurityTrustHtml(email);
  }