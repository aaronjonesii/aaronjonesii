import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { appInformation } from '../../information';
import { ProjectWithID, ProjectWithTech } from '../interfaces/project';
import { navPath } from '../../app.routes';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  generateProjectTags(project: ProjectWithID | ProjectWithTech) {
    this.generateTags({
      title: project.name,
      route: navPath.projectDetail(project.id),
      author: appInformation.name,
      description: project.description,
      type: 'article',
      image: project.image ?? '',
    });
  }

  generateTags(tags: {
    title?: string,
    description?: string,
    image?: string,
    route: string,
    author?: string,
    type?: 'article' | 'profile' | 'website'
  }) {
    const title = tags.title ?
      `${tags.title} - ${appInformation.name}` : appInformation.title;
    const description = tags.description ?? appInformation.description;
    const image = tags.image ?? '/assets/svgs/flat_afro.svg';
    const domain = this.document.location.hostname;
    /* set title */
    this.titleService.setTitle(title);

    /* set twitter meta tags */
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({
      name: 'twitter:site',
      content: appInformation.socials.twitter,
    });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    /* set open graph meta tags */
    this.meta.updateTag({
      name: 'author',
      content: tags.author ?? appInformation.name,
    });
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      property: 'og:type',
      content: tags.type ?? 'website',
    });
    this.meta.updateTag({
      property: 'og:site_name',
      content: appInformation.name,
    });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: domain + tags.route });
  }
}
