import { gql } from '@apollo/client';

const GET_CRM_USERS = gql`
  mutation {
    GetCRMusers {
      name
      email
    }
  }
`;

const PUSH_NEW_SALE_MUTATION = gql`
mutation PushNewSale(
  $ownerName: String!,
  $saleRep: String!,
  $atticImage: String!,
  $electricalImage: String!,
  $LicenseImage: String!,
  $depositImage: String!,
  $installer: String!,
  $program: String!,
  $notes: String!,
  $adders: String!

) {
  pushNewSale(
    ownerName: $ownerName,
    saleRep: $saleRep,
    atticImage: $atticImage,
    electricalImage: $electricalImage,
    LicenseImage: $LicenseImage,
    depositImage: $depositImage,
    installer: $installer,
    program: $program,
    notes: $notes,
    adders: $adders
  )
}
`;
export { GET_CRM_USERS, PUSH_NEW_SALE_MUTATION};