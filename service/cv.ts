import { GET_CVS } from '~/graphql/cv/query';
import type { CvApi } from '~/types/cv.types';

export const handleGetCvs = async () => {
  try {
    const { data, fetch } = useApolloQuery(GET_CVS);
    await fetch();
    return data.value.cvs.map((cv: CvApi) => {
      return mapApiToCv(cv);
    });
  } catch (error) {
    console.error('failed to get cvs', error);
  }
};
