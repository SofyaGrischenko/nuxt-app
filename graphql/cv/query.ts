import { gql } from '@apollo/client/core';

export const GET_CVS = gql`
  query GET_CVS {
    cvs {
      id
      created_at
      name
      education
      description
      user {
        id
        email
        department_name
        position_name
        role
        # profile {
        #   id
        #   first_name
        #   last_name
        #   full_name
        # }
      }
      skills {
        name
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;
