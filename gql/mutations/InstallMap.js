import { gql } from "@apollo/client";

const GET_MAP_DATA = gql`
  query {
    GetMapData {
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

export { GET_MAP_DATA };
