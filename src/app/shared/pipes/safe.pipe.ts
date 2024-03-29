import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from "@angular/platform-browser";

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(
    content: string,
    type: 'html' | 'style' | 'script' | 'url' | 'resourceUrl'
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case "html": return this.sanitizer.bypassSecurityTrustHtml(content);
      case "style": return this.sanitizer.bypassSecurityTrustStyle(content);
      case "script": return this.sanitizer.bypassSecurityTrustScript(content);
      case "url": return this.sanitizer.bypassSecurityTrustUrl(content);
      case "resourceUrl": return this.sanitizer.bypassSecurityTrustUrl(content);
    }
  }
}
