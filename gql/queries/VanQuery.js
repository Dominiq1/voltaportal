import { gql } from '@apollo/client';

const GET_VAN = gql`
  query GetVan($id: ID!) {
    Van(id: $id) {
      id
      licensePlate
      statusFill
    }
  }
`;


const GET_VAN_ITEMS = gql`
  query GetVanItems($vanId: ID!) {
    VanItems(vanId: $vanId) {
      id
      itemName
      itemQuantity
      itemImage
      itemDescription
    }
  }
`;





const UPDATE_VAN_ITEM_MUTATION = gql`
  mutation UpdateVanItem(
    $itemId: String!
    $itemName: String!
    $itemDescription: String!
    $itemQuantity: String!
    $itemImage: String
    $vanId: String!
  ) {
    updateVanItem(
      itemId: $itemId
      itemName: $itemName
      itemDescription: $itemDescription
      itemQuantity: $itemQuantity
      itemImage: $itemImage
      vanId: $vanId
    ) {
      itemId
      itemName
      itemDescription
      itemQuantity
      itemImage
      vanId
    }
  }
`;


export { GET_VAN , GET_VAN_ITEMS, UPDATE_VAN_ITEM_MUTATION};