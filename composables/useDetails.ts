import {
  handleGetDepartments,
  handleGetLanguages,
  handleGetPositions,
  handleGetSkills,
} from '~/service/details';
import type { Details } from '~/types/form.types';

export const useDetails = () => {
  const positions = useState<Details[]>('positions', () => []);
  const departments = useState<Details[]>('departments', () => []);
  const skills = useState<Details[]>('skills', () => []);
  const languages = useState<Details[]>('languages', () => []);
  const searchQuery = ref('');
  const pagesToShow = ref(1);
  const pageSize = 20;

  const getPositions = async () => {
    if (positions.value.length > 0) return;
    try {
      const response = await handleGetPositions();

      if (response.positions) {
        positions.value = response.positions;
      }
    } catch (error) {
      console.error('failed to det positions', error);
    }
  };

  const getDepartments = async () => {
    if (departments.value.length > 0) return;
    try {
      const response = await handleGetDepartments();

      if (response.departments) {
        departments.value = response.departments;
      }
    } catch (error) {
      console.error('failed to get departments', error);
    }
  };

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

  const getLanguages = async () => {
    if (languages.value.length > 0) return;

    try {
      const response = await handleGetLanguages();

      if (response.languages) {
        languages.value = response.languages;
      }
      console.log('languages', languages);
    } catch (error) {
      console.error('failed to get skills', error);
    }
  };

  const loadMore = () => pagesToShow.value++;

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

  const filteredLanguages = computed(() => {
    const search = searchQuery.value.trim().toLowerCase();
    if (!search) {
      return languages.value;
    }
    return languages.value.filter((language) =>
      language.name?.toLowerCase().includes(search)
    );
  });

  return {
    positions,
    departments,
    filteredSkills,
    skillsToShow,
    searchQuery,
    filteredLanguages,
    loadMore,
    getPositions,
    getDepartments,
    getSkills,
    getLanguages,
  };
};
