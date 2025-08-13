import {
  handleGetDepartments,
  handleGetPositions,
} from '~/service/details';
import type { Details, SkillCategory } from '~/types/form.types';

export const useDetails = () => {
  const positions = useState<Details[]>('positions', () => []);
  const departments = useState<Details[]>('departments', () => []);
  const skillCategories = useState<SkillCategory[]>(
    'skillCategories',
    () => []
  );

  const searchQuery = ref('');

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

  return {
    positions,
    departments,
    searchQuery,
    skillCategories,
    getPositions,
    getDepartments,
  };
};
