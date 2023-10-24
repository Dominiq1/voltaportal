import { gql } from "@apollo/client";

const GET_CRM_USERS = gql`
  mutation {
    GetCRMusers {
      name
      email
    }
  }
`;

const PUSH_NEW_LEAD = gql`
  mutation PushNewLead(
    $HomeownerName: String!
    $AmbassadorName: String!
    $Address: String!
    $Phone: String!
    $Email: String!
    $DateString: String!
    $UtilityBill: String!
  ) {
    pushNewLead(
      HomeownerName: $HomeownerName
      AmbassadorName: $AmbassadorName
      Address: $Address
      Phone: $Phone
      Email: $Email
      DateString: $DateString
      UtilityBill: $UtilityBill
    )
  }
`;
const PUSH_NEW_SALE_MUTATION = gql`
  mutation PushNewSale(
    $ownerName: String!
    $saleRep: String!
    $leadGen: String!
    $leadgenEmail: String!
    $utilityImage1: String!
    $utilityImage2: String!
    $atticImage1: String!
    $atticImage2: String!
    $LicenseImage: String!
    $depositImage: String!
    $installer: String!
    $program: String!
    $notes: String!
    $adders: [String]!
    $repEmail: String!
  ) {
    pushNewSale(
      ownerName: $ownerName
      saleRep: $saleRep
      utilityImage1: $utilityImage1
      utilityImage2: $utilityImage2
      atticImage1: $atticImage1
      atticImage2: $atticImage2
      leadGen: $leadGen
      leadgenEmail: $leadgenEmail
      LicenseImage: $LicenseImage
      depositImage: $depositImage
      installer: $installer
      program: $program
      notes: $notes
      adders: $adders
      repEmail: $repEmail
    )
  }
`;

export { GET_CRM_USERS, PUSH_NEW_SALE_MUTATION, PUSH_NEW_LEAD };
