import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Title } from "@angular/platform-browser";
import { appInformation } from "../../information";

@Injectable({ providedIn: 'root' })
export class TitleService {
  private titleSubject = new BehaviorSubject<string>(appInformation.title);
  public title$ = this.titleSubject.asObservable();

  constructor(private title: Title) {
    /** Set Browser Title on each change */
    // this.title$.forEach(title => this.title.setTitle(title));
  }

  public setTitle(title: string): void {
    this.titleSubject.next(title);
  }
}
