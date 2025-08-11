import { gql } from '@apollo/client/core';

export const GET_POSITIONS = gql`
  query GET_POSITIONS {
    positions {
      id
      name
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  query GET_DEPARTMENTS {
    departments {
      id
      name
    }
  }
`;

export const GET_SKILLS = gql`
  query GET_SKILLS {
    skills {
      id
      created_at
      name
      category_name
    }
  }
`;
