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


const GET_Pending_MAP_DATA = gql`
  query {
    GetPendingQuoteMapData {
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


const GET_TX_MAP_DATA = gql`
  query {
    GetSunnovaTXMapData {
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



const GET_Enphase_MAP_DATA = gql`
  query {
    GetEnphaseMapData {
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




const GET_Texas_MAP_DATA = gql`
  query {
    GetTexasMapData {
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


const GET_MASTER_MAP_DATA = gql`
  query {
    GetMasterMapData {
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


export {GET_Texas_MAP_DATA, GET_MAP_DATA , GET_Pending_MAP_DATA, GET_Enphase_MAP_DATA, GET_TX_MAP_DATA, GET_MASTER_MAP_DATA};
