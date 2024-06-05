import { Injectable, signal } from '@angular/core';
import { SkillCategory } from '../interfaces/skill';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  protected readonly mockSkills = signal<SkillCategory[]>([
    {
      name: 'Programming Languages',
      skills: [
        { name: 'HTML/CSS', rating: 5 },
        { name: 'Java/Javascript', rating: 5 },
        { name: 'Typescript', rating: 5 },
        { name: 'Python', rating: 4 },
        { name: 'PHP', rating: 3 },
        { name: 'C++/C#', rating: 1 },
      ],
    },
    {
      name: 'Frameworks',
      skills: [
        { name: 'Angular', rating: 5 },
        { name: 'Django', rating: 4 },
        { name: 'Flutter', rating: 0 },
      ],
    },
  ]);

  getSkills$() {
    return toObservable(this.mockSkills);
  }
}
