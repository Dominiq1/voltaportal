import { gql } from "@apollo/client";



const UPDATE_SERVICE_CHECKLIST = gql`
mutation UpdateServiceChecklist($serviceID: String!, $taskReason: String!) {
  UpdateServiceChecklist(serviceID: $serviceID, taskReason: $taskReason) {
      firstName
      lastName
      email
      phone
      address
      city
      zip
      bid
      pieceRate
      addedQbId
      serviceNotes
      systemID
      serviceTechs
      leadID
      serviceChecklist
      serviceTasks {
        taskTitle
        reasonCount
        taskImage
        serviceID
        serviceStatus
      }
    }
  }
`;


const GET_SERVICE_CHECKLIST = gql`
query GetServiceChecklist($serviceID: String!) {
    GetServiceChecklist(serviceID: $serviceID) {
      firstName
      lastName
      email
      phone
      address
      city
      zip
      bid
      pieceRate
      addedQbId
      serviceNotes
      systemID
      serviceTechs
      leadID
      serviceChecklist
      serviceTasks {
        taskTitle
        reasonCount
        taskImage
        serviceID
        serviceStatus
      }
    }
  }
`;


export { GET_SERVICE_CHECKLIST ,UPDATE_SERVICE_CHECKLIST};

