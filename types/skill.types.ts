export interface SkillCategory {
  id: string;
  name: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  category_name?: string;
}

export interface CreateSkillInput {
  name: string;
  categoryId: string;
}

export interface UpdateSkillInput {
  skillId: string;
  name: string;
  categoryId: string;
}
