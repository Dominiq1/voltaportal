import { gql } from "@apollo/client";

const GET_USER_MAP_DATA = gql`
  query GetUserMapInfo($recordID: String!) {
    GetUserMapInfo(recordID: $recordID) {
      color
      position {
        lat
        lng
      }
      label {
        text
        color
      }
      latitude
      longitude
      textPub
      colorPub
      installer 
      installDate
      projectURL
    }
  }
`;

export { GET_USER_MAP_DATA };
