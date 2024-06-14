import { Injectable, signal } from '@angular/core';
import { GenericItem } from '../interfaces/generic-item';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class HobbiesService {
  protected readonly mockHobbies = signal<GenericItem[]>([
    { id: 'music', name: 'Music', icon: 'music_note' },
    { id: 'fashion', name: 'Fashion', icon: 'interests' },
    { id: 'video-games', name: 'Video Games', icon: 'videogame_asset' },
    { id: 'travel', name: 'Traveling', icon: 'flight' },
    { id: 'photo', name: 'Capturing Moments', icon: 'party_mode' },
    { id: 'diy', name: 'DIY', icon: 'handyman' },
    { id: 'development', name: 'Software Development', icon: 'logo_dev' },
    { id: 'campfires', name: 'Campfires', icon: 'local_fire_department' },
    { id: 'sleeping', name: 'Sleeping', icon: 'single_bed' },
  ]);

  get getHobbies$() {
    return toObservable(this.mockHobbies);
  }
}
