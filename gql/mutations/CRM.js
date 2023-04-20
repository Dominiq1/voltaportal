import { gql } from '@apollo/client';

const GET_CRM_USERS = gql`
  mutation {
    GetCRMusers {
      name
    }
  }
`;

export { GET_CRM_USERS};