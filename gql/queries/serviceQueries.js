import { gql } from '@apollo/client';

const GET_SERVICE_JOBS = gql`
  query GetServiceJobs($repID: String!) {
    GetServiceJobs(repID: $repID) {
      email
      projectID
      address
      homeownerName
      foreman1
      foreman2
      journeyman1
      journeyman2
      apprentice11
      apprentice12
      apprentice21
      apprentice22
      apprentice31
      apprentice32
      serviceTime
      serviceDate
    }
  }
`;


export { GET_SERVICE_JOBS };