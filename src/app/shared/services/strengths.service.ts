import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StrengthsService {
  readonly strengths = [
    {
      title: 'Angular Expertise',
      description:
        'Proficient in building dynamic and maintainable Angular applications.',
    },
    {
      title: 'Accessibility Advocate',
      // eslint-disable-next-line max-len
      description: 'Committed to developing inclusive web experiences that serve all users.',
    },
    {
      title: 'Collaborative Problem-Solver',
      description:
        'Thrives in team environments to deliver innovative solutions.',
    },
    {
      title: 'SEO-Minded Development',
      // eslint-disable-next-line max-len
      description: 'Understands the importance of search engine optimization in application development.',
    },
    {
      title: 'Passion for Learning',
      description:
        'Dedicated to staying ahead of the curve in web technologies.',
    },
  ];

  get strengths$() {
    return of(this.strengths);
  }
}
