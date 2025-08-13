import { gql } from '@apollo/client/core';

export const UPDATE_SKILL = gql`
  mutation UPDATE_SKILL($input: UpdateSkillInput!) {
    updateSkill(skill: $input) {
      id
    }
  }
`;

export const UPDATE_LANGUAGE = gql`
  mutation UPDATE_LANGUAGE($input: UpdateLanguageInput!) {
    updateLanguage(language: $input) {
      id
    }
  }
`;
