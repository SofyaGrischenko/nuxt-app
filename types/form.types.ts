export interface Details {
  id: string;
  created_at: string;
  name: string;
  category_name?: string;
  iso2?: string;
  native_name?: string;
}

interface SkillCategory {
  id: string;
  name: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  category_name: string;
}

export interface Language {
  id: string;
  iso2: string;
  name: string;
  native_name: string;
}

type InputProps = boolean | string | undefined | null | Details[];

export interface Input {
  label: string;
  field: string;
  component: string;
  value?: string;
  props?: { [key: string]: InputProps };
}
