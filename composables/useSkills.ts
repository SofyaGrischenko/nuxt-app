import {
  handleGetSkills,
  handleGetSkillsCategories,
  handleUpdateSkill,
} from '~/service/details';
import type {
  Skill,
  SkillCategory,
  UpdateSkillInput,
} from '~/types/form.types';

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
    if (skills.value.length > 0) return;

    try {
      const response = await handleGetSkills();

      if (response.skills) {
        skills.value = response.skills;
      }
    } catch (error) {
      console.error('failed to get skills', error);
    }
  };

  const getSkillCategories = async () => {
    const response = await handleGetSkillsCategories();

    if (response.skillCategories) {
      skillCategories.value = response.skillCategories;
    }
  };

  const updateSkill = async (input: UpdateSkillInput) => {
    const originalSkill = skills.value.find((s) => s.id === input.skillId);

    if (!originalSkill) {
      return;
    }

    const hasChanges =
      originalSkill.name !== input.name ||
      originalSkill.category.id !== input.categoryId;
    console.log(originalSkill);

    if (!hasChanges) {
      warning('No information to update');
      return;
    }

    try {
      const response = await handleUpdateSkill(input);

      console.log('response', response);

      success('Skill has been updated');
    } catch (e) {
      console.error('failed to update skill', e);
      error('Failed to update skill');
    }
  };

  return {
    searchQuery,
    skills: skillsToShow,
    filteredSkills,
    skillsToShow,
    skillCategories,
    loadMore,
    getSkills,
    getSkillCategories,
    updateSkill,
  };
};
