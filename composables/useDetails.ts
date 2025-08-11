import {
  handleGetDepartments,
  handleGetPositions,
  handleGetSkills,
} from '~/service/details';
import type { Details } from '~/types/form.types';

export const useDetails = () => {
  const positions = useState<Details[]>('positions', () => []);
  const departments = useState<Details[]>('departments', () => []);
  const skills = useState('skills', () => []);

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

  return {
    positions,
    departments,
    skills,
    getPositions,
    getDepartments,
    getSkills,
  };
};
