import type { SkillCategory } from "./skill.types";

export interface Details {
  id: string;
  created_at: string;
  name: string;
  category_name?: string;
  iso2?: string;
  native_name?: string;
}

type InputProps =
  | boolean
  | string
  | undefined
  | null
  | Details[]
  | SkillCategory[];

export interface Input {
  label: string;
  field: string;
  component: string;
  value?: string;
  props?: { [key: string]: InputProps };
}
