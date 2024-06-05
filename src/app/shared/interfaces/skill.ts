import { NumberRange } from '../types/number-range.type';

export interface SkillCategory {
  name: string,
  skills: Skill[],
}

export interface Skill {
  name: string,
  rating: NumberRange<0, 6>,
}
