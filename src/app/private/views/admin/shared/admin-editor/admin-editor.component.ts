import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppComponent } from "src/app/app.component";
import { ChangeEvent, CKEditor5 } from "@ckeditor/ckeditor5-angular";

@Component({
  selector: 'aj-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.scss']
})
export class AdminEditorComponent {
  @Input() config: CKEditor5.Config = {
    placeholder: 'Write content here...',
    wordCount: {
      onUpdate: (stats:{characters: number, words: number}) => {
        const storyCharacterCount = stats.characters;
        const storyWordCount = stats.words;
      }
    }
  };
  @Input() disabled: boolean = false;
  @Output() readyChange = new EventEmitter<CKEditor5.Editor>();
  @Output() editorChange = new EventEmitter<ChangeEvent>();
  public Editor?:  CKEditor5.EditorConstructor;
  @Input() content?: string = '';
  @Input() tagName: string = 'div';

  constructor() {
    if (AppComponent.isBrowser) {
      const CustomEditor = require("./CustomInlineEditor/ckeditor.js");
      this.Editor = CustomEditor.Editor;
    }
  }

  onReady(ready_event: CKEditor5.Editor) { this.readyChange.emit(ready_event); }
  onChange(change_event: ChangeEvent) { this.editorChange.emit(change_event); }
}
