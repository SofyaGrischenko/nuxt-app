import {
  handleGetDepartments,
  handleGetPositions,
  handleGetSkills,
} from '~/service/details';
import type { Details } from '~/types/form.types';

export const useDetails = () => {
  const positions = useState<Details[]>('positions', () => []);
  const departments = useState<Details[]>('departments', () => []);
  const searchQuery = ref('');
  const skills = useState<Details[]>('skills', () => []);
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

  const filteredSkills = computed(() => {
    const search = searchQuery.value.trim().toLowerCase();
    if (!search) {
      return skills.value;
    }
    return skills.value.filter((skill) =>
      skill.name?.toLowerCase().includes(search)
    );
  });

  const loadMore = () => pagesToShow.value++;

  const skillsToShow = computed(() =>
    filteredSkills.value.slice(0, pagesToShow.value * pageSize)
  );

  return {
    positions,
    departments,
    // skills,
    filteredSkills,
    skillsToShow,
    searchQuery,
    loadMore,
    getPositions,
    getDepartments,
    getSkills,
  };
};
