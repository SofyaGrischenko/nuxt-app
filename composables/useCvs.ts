import { handleGetCvs } from '~/service/cv';
import type { Cv } from '~/types/cv.types';

export const useCvs = () => {
  const cvs = useState<Cv[] | null>('cvs', () => null);

  const { error } = useToastNotification();

  const fetchCvs = async () => {
    try {
      const response = await handleGetCvs();
      cvs.value = response;
    } catch (e) {
      console.error('failed to fetch cvs', e);
      error('Failed to get CVs');
    }
  };

  return {
    fetchCvs,
  };
};
