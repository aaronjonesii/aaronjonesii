import { Injectable, signal } from '@angular/core';
import { GenericItem } from '../interfaces/generic-item';
import { toObservable } from '@angular/core/rxjs-interop';
import { appInformation } from '../../information';

@Injectable({ providedIn: 'root' })
export class SocialsService {
  protected readonly mockSocials = signal<GenericItem[]>([
    {
      id: 'github',
      name: 'GitHub',
      icon: 'github',
      isSvgIcon: true,
      tooltip: 'Github',
      href: appInformation.socials.github,
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'twitter',
      isSvgIcon: true,
      tooltip: 'Twitter',
      href: appInformation.socials.twitter,
    },
    {
      id: 'linkedin',
      name: 'Linkedin',
      icon: 'linkedin',
      isSvgIcon: true,
      tooltip: 'LinkedIn',
      href: appInformation.socials.linkedin,
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'facebook',
      isSvgIcon: true,
      tooltip: 'Facebook',
      href: appInformation.socials.facebook,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'instagram',
      isSvgIcon: true,
      tooltip: 'Instagram',
      href: appInformation.socials.instagram,
    },
  ]);

  get getSocials$() {
    return toObservable(this.mockSocials);
  }
}
