import { GET_DEPARTMENTS, GET_POSITIONS } from '~/graphql/details/query';

export const handleGetPositions = async () => {
  try {
    const { data, fetch } = useApolloQuery(GET_POSITIONS);
    await fetch();

    return data?.value;
  } catch (error) {
    console.error('failed to get positions', error);
  }
};

export const handleGetDepartments = async () => {
  try {
    const { data, fetch } = useApolloQuery(GET_DEPARTMENTS);
    await fetch();

    return data?.value;
  } catch (error) {
    console.error('failed to get departments', error);
  }
};
