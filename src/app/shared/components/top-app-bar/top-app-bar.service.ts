import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { appInformation } from "../../../information";

export interface TopAppBarOptions {
  title: string,
  showBackBtn: boolean,
  loading: boolean,
}

@Injectable({ providedIn: 'root' })
export class TopAppBarService {
  private optionsSubject = new BehaviorSubject<TopAppBarOptions>({
    title: appInformation.title,
    showBackBtn: false,
    loading: false,
  });
  public options$ = this.optionsSubject.asObservable();

  public setOptions(options: TopAppBarOptions): void {
    this.optionsSubject.next(options);
  }
}
