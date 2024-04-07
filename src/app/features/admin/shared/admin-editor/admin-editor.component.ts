import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppComponent } from "src/app/app.component";
import { ChangeEvent, CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { FormsModule } from "@angular/forms";
import { Editor, EditorConfig } from "@ckeditor/ckeditor5-core";

@Component({
  selector: 'aj-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrl: './admin-editor.component.scss',
  standalone: true,
  imports: [CKEditorModule, FormsModule],
})
export class AdminEditorComponent {
  @Input() config: EditorConfig = {
    placeholder: 'Write content here...',
    // wordCount: {
    //   onUpdate: (stats:{characters: number, words: number}) => {
    //     const storyCharacterCount = stats.characters;
    //     const storyWordCount = stats.words;
    //     /* todo: use these values */
    //     console.log(`content character count`, storyCharacterCount);
    //     console.log(`content word count`, storyWordCount);
    //   }
    // }
  };
  @Input() disabled = false;
  @Output() readonly readyChange = new EventEmitter<unknown>();
  @Output() readonly editorChange = new EventEmitter<ChangeEvent>();
  editor?: {create(sourceElementOrData: (HTMLElement | string), config?: EditorConfig): Promise<Editor>};
  @Input() content?: string = '';
  @Input() tagName = 'div';
  loaded = false;

  constructor() {
    if (AppComponent.isBrowser) {
      import('./CustomInlineEditor/ckeditor.js' as string)
        .then(e => {
          this.editor = e.Editor;
          this.loaded = true;
        });
    }
  }

  onReady(ready_event: unknown) { this.readyChange.emit(ready_event); }
  onChange(change_event: ChangeEvent) { this.editorChange.emit(change_event); }
}
