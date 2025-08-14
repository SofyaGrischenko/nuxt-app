import {
  CREATE_LANGUAGE,
  CREATE_SKILL,
  DELETE_LANGUAGE,
  DELETE_SKILL,
  UPDATE_LANGUAGE,
  UPDATE_SKILL,
} from '~/graphql/details/mutations';
import {
  GET_DEPARTMENTS,
  GET_LANGUAGES,
  GET_POSITIONS,
  GET_SKILLS,
  GET_SKILLS_CATEGORIES,
} from '~/graphql/details/query';
import type {
  CreateLanguageInput,
  CreateSkillInput,
  LanguageInput,
  UpdateSkillInput,
} from '~/types/form.types';

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

export const handleUpdateSkill = async (input: UpdateSkillInput) => {
  try {
    const { data, mutate } = useApolloMutation(UPDATE_SKILL);
    await mutate({ input });

    return data.value;
  } catch (error) {
    console.error('failed to update skill', error);
  }
};

export const handleGetSkillsCategories = async () => {
  const { data, fetch } = useApolloQuery(GET_SKILLS_CATEGORIES);
  await fetch();

  return data.value;
};

export const handleCreateSkill = async (input: CreateSkillInput) => {
  try {
    const { data, mutate } = useApolloMutation(CREATE_SKILL);
    await mutate({ input });

    return data.value;
  } catch (error) {
    console.error('failed to create skill', error);
  }
};

export const handleGetLanguages = async () => {
  try {
    const { data, fetch } = useApolloQuery(GET_LANGUAGES);
    await fetch();

    return data?.value;
  } catch (error) {
    console.error('failed to get languages', error);
  }
};

export const handleUpdateLanguage = async (input: LanguageInput) => {
  try {
    const { data, mutate } = useApolloMutation(UPDATE_LANGUAGE);
    await mutate({ input });

    return data.value;
  } catch (error) {
    console.error('failed to update language', error);
  }
};

export const handleCreateLanguage = async (input: CreateLanguageInput) => {
  try {
    const { data, mutate } = useApolloMutation(CREATE_LANGUAGE);
    await mutate({ input });

    return data.value;
  } catch (error) {
    console.error('failed to create language', error);
  }
};

export const handleDeleteSkill = async (id: string) => {
  try {
    const { data, mutate } = useApolloMutation(DELETE_SKILL);
    await mutate({ input: { skillId: id } }, {});

    return data.value;
  } catch (error) {
    console.error('failed to delete skill', error);
  }
};

export const handleDeleteLang = async (id: string) => {
  try {
    const { data, mutate } = useApolloMutation(DELETE_LANGUAGE);
    await mutate({ input: { languageId: id } }, {});

    return data.value;
  } catch (error) {
    console.error('failed to delete language', error);
  }
};
