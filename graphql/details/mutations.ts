import { gql } from '@apollo/client/core';

export const UPDATE_SKILL = gql`
  mutation UPDATE_SKILL($input: UpdateSkillInput!) {
    updateSkill(skill: $input) {
      id
      name
      category_name
      category {
        id
      }
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

export const CREATE_SKILL = gql`
  mutation CREATE_SKILL($input: CreateSkillInput!) {
    createSkill(skill: $input) {
      id
      name
      category_name
      category {
        id
      }
    }
  }
`;

export const CREATE_LANGUAGE = gql`
  mutation CREATE_LANGUAGE($input: CreateLanguageInput!) {
    createLanguage(language: $input) {
      id
      iso2
      name
      native_name
    }
  }
`;
