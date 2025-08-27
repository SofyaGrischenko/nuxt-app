import {
  handleCreateSkill,
  handleDeleteSkill,
  handleGetSkills,
  handleGetSkillsCategories,
  handleUpdateSkill,
} from '~/service/details';
import type {
  CreateSkillInput,
  Skill,
  SkillCategory,
  UpdateSkillInput,
} from '~/types/skill.types';

export const useSkills = () => {
  const skills = useState<Skill[]>('skills', () => []);
  const skillCategories = useState<SkillCategory[]>(
    'skillCategories',
    () => []
  );

  const { success, warning, error } = useToastNotification();

  const searchQuery = ref('');
  const pagesToShow = ref(1);
  const pageSize = 20;

  const filteredSkills = computed(() => {
    const search = searchQuery.value.trim().toLowerCase();
    if (!search) {
      return skills.value;
    }
    return skills.value.filter((skill) =>
      skill.name?.toLowerCase().includes(search)
    );
  });

  const skillsToShow = computed(() =>
    filteredSkills.value.slice(0, pagesToShow.value * pageSize)
  );

  const loadMore = () => pagesToShow.value++;

  const getSkills = async () => {
    if (skills.value.length !== 0) return;
    try {
      const response = await handleGetSkills();

      if (response.skills) {
        skills.value = [...response.skills];
      }
    } catch (e) {
      console.error('failed to get skills', e);
      error('Failed to load skills');
    }
  };

  const getSkillCategories = async () => {
    const response = await handleGetSkillsCategories();

    if (response.skillCategories) {
      skillCategories.value = response.skillCategories;
    }
  };

  const updateSkill = async (input: UpdateSkillInput) => {
    const originalSkillIndex = skills.value.findIndex(
      (s) => s.id === input.skillId
    );
    if (originalSkillIndex === -1) return;

    const originalSkill = skills.value[originalSkillIndex];

    if (!originalSkill) {
      return;
    }

    const hasChanges =
      originalSkill.name !== input.name ||
      originalSkill.category.id !== input.categoryId;

    if (!hasChanges) {
      warning('No information to update');
      return;
    }

    try {
      await handleUpdateSkill(input);

      const category = skillCategories.value.find(
        (c) => c.id == input.categoryId
      );

      if (category) {
        skills.value.splice(originalSkillIndex, 1, {
          ...originalSkill,
          name: input.name,
          category: category,
        });
      }

      success('Skill has been updated');
    } catch (e) {
      console.error('failed to update skill', e);
      error('Failed to update skill');
    }
  };

  const createSkill = async (input: CreateSkillInput) => {
    try {
      const newSkill = await handleCreateSkill(input);

      if (newSkill) {
        skills.value.push(newSkill.createSkill);
        success('New skill has been created');
      }
    } catch (e) {
      console.error('failed to create skill', e);
      error('Failed to create skill');
    }
  };

  const deleteSkill = async (input: string) => {
    try {
      await handleDeleteSkill(input);

      const index = skills.value.findIndex((s) => s.id === input);
      if (index !== -1) {
        skills.value.splice(index, 1);
      }

      success('Skill has been deleted');
    } catch (e) {
      console.error('failed to delete skill', e);
      error('Failed to delete skill');
    }
  };

  return {
    searchQuery,
    skills: skillsToShow,
    filteredSkills,
    skillCategories,
    loadMore,
    getSkills,
    getSkillCategories,
    updateSkill,
    createSkill,
    deleteSkill,
  };
};
