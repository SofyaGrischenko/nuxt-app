import { handleGetDepartments, handleGetPositions } from '~/service/details';
import type { Details } from '~/types/form.types';

export const useDetails = () => {
  const positions = useState<Details[] | null>('positions', () => null);
  const departments = useState<Details[] | null>('departments', () => null);

  const getPositions = async () => {
    try {
      const response = await handleGetPositions();

      if (response.positions) {
        positions.value = response.positions.map(
          (position: Details) => position.name
        );
      }
    } catch (error) {
      console.error('failed to det positions', error);
    }
  };

  const getDepartments = async () => {
    try {
      const response = await handleGetDepartments();

      if (response.departments) {
        departments.value = response.departments.map(
          (department: Details) => department.name
        );
      }
    } catch (error) {
      console.error('failed to det departments', error);
    }
  };

  // onMounted( () => {
  //   getPositions();
  //   getDepartments();
  // });

  return {
    positions,
    departments,
    getPositions,
    getDepartments,
  };
};
