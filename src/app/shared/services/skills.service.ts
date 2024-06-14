import { Injectable, signal } from '@angular/core';
import { SkillCategory } from '../interfaces/skill';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  protected readonly mockSkills = signal<SkillCategory[]>([
    {
      id: 'frameworks',
      name: 'Frameworks',
      skills: [
        { id: 'angular', name: 'Angular', rating: 5 },
        { id: 'django', name: 'Django', rating: 4 },
        { id: 'dotnet', name: '.NET', rating: 3 },
        // { id: 'flutter', name: 'Flutter', rating: 0 },
        // { id: 'react', name: 'React', rating: 0 },
      ],
    },
    {
      id: 'databases',
      name: 'Databases',
      skills: [
        { id: 'nosql', name: 'No-SQL', rating: 5 },
        { id: 'mysql', name: 'MySQL', rating: 4 },
        { id: 'sql', name: 'SQL', rating: 4 },
      ],
    },
    {
      id: 'programming-languages',
      name: 'Programming Languages',
      skills: [
        { id: 'html-css', name: 'HTML/CSS', rating: 5 },
        { id: 'java-javascript', name: 'Java/Javascript', rating: 5 },
        { id: 'typescript', name: 'Typescript', rating: 5 },
        { id: 'python', name: 'Python', rating: 4 },
        { id: 'php', name: 'PHP', rating: 3 },
        { id: 'c-cpp-csharp', name: 'C/C++/C#', rating: 3 },
      ],
    },
    // {
    //   id: 'operating-systems',
    //   name: 'Operating Systems',
    //   skills: [
    //     { id: 'macos', name: 'macOS', rating: 5 },
    //     { id: 'windows', name: 'Windows', rating: 5 },
    //     { id: 'debian', name: 'Debian', rating: 4 },
    //     { id: 'centos', name: 'centOS', rating: 4 },
    //     { id: 'redhat', name: 'RedHet', rating: 4 },
    //   ],
    // },
  ]);

  get getSkills$() {
    return toObservable(this.mockSkills);
  }
}
