import {
  GET_DEPARTMENTS,
  GET_POSITIONS,
  GET_SKILLS,
} from '~/graphql/details/query';

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

export const handleGetSkills = async () => {
  try {
    const { data, fetch } = useApolloQuery(GET_SKILLS);
    await fetch();

    return data?.value;
  } catch (error) {
    console.error('failed to get skills', error);
  }
};
