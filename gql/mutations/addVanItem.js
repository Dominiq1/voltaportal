import { gql } from '@apollo/client';

const ADD_VAN_ITEM = gql`
  mutation AddVanItem(
    $itemId: String!,
     $itemName: String!,
      $itemDescription: String!,
       $itemQuantity: String!, 
       $itemImage: String, 
       $vanId: String!) {
    addVanItem(itemId: $itemId, itemName: $itemName, itemDescription: $itemDescription, itemQuantity: $itemQuantity, itemImage: $itemImage, vanId: $vanId) {
      itemId
      itemName
      itemDescription
      itemQuantity
      itemImage
      vanId {
        id
      }
    }
  }
`;



const UPDATE_VAN_ITEM = gql`
  mutation UpdateVanItem(
    $itemId: String!,
    $itemName: String!,
    $itemDescription: String!,
    $itemQuantity: String!,
    $itemImage: String,
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
    itemDescription
    itemQuantity
    itemImage
    vanId {
      id
      licensePlate
    } 
     
    }
  }
`;

export  {ADD_VAN_ITEM, UPDATE_VAN_ITEM};