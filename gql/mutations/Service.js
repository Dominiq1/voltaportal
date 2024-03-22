import { gql } from "@apollo/client";


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


export { GET_SERVICE_CHECKLIST };

