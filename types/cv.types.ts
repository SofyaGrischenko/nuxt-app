import type { User, UserApi } from './user.types';

export enum Proficiency {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
  Native = 'Native',
}
export enum Mastery {
  Novice = 'Novice',
  Advanced = 'Advanced',
  Competent = 'Competent',
  Proficient = 'Proficient',
  Expert = 'Expert',
}

export interface CvLanguage {
  name: string;
  proficiency: Proficiency;
}

export interface CvSkill {
  name: string;
  categoryId: string;
  mastery: Mastery;
}

export interface CvUserInterface {
  first_name: string;
  full_name: string;
}

export interface Project {
  id: string;
  createdAt: string;
  name: string;
  internalName: string;
  domain: string;
  startDate: string;
  endDate: string;
  description: string;
  environment: string[];
  responsibilities: string[];
  roles: string[];
}

export interface Cv {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  education: string;
  user: User;
  projects: Project[];
  skills: CvSkill[];
  languages: CvLanguage[];
}

export interface CvApi {
  id: string;
  created_at: string;
  name: string;
  description: string;
  education: string;
  user: UserApi;
  projects: Project[];
  skills: CvSkill[];
  languages: CvLanguage[];
}

export type CvInList = Pick<Cv, 'id' | 'name' | 'description'> & {
  employee: string;
};
