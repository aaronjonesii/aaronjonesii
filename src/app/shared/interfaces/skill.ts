import { NumberRange } from '../types/number-range.type';

export interface SkillCategory {
  id: string,
  name: string,
  skills: Skill[],
}

export interface Skill {
  id: string,
  name: string,
  rating: NumberRange<0, 6>,
}
