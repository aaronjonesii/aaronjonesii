import { Injectable, signal } from '@angular/core';
import { GenericItem } from '../interfaces/generic-item';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class HobbiesService {
  protected readonly mockHobbies = signal<GenericItem[]>([
    { id: 'music', name: 'Music', icon: 'music_note' },
    { id: 'fashion', name: 'Fashion', icon: 'styler' },
    { id: 'video-games', name: 'Video Games', icon: 'videogame_asset' },
    { id: 'travel', name: 'Traveling', icon: 'flight' },
    { id: 'photo', name: 'Capturing Moments', icon: 'photo_camera' },
    { id: 'diy', name: 'DIY', icon: 'build_circle' },
  ]);

  get getHobbies$() {
    return toObservable(this.mockHobbies);
  }
}
