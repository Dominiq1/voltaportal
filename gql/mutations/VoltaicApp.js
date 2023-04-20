import { gql } from '@apollo/client';


const GET_VOLTAIC_INSTALLS = gql`
  mutation {
    GetVoltaicInstalls {
      ownerName
    }
  }
`;

export {GET_VOLTAIC_INSTALLS};