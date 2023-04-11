import { gql } from '@apollo/client';

const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      orderId
      itemName
      itemDescription
      itemImages
      quantity
      status
      van {
        id
        name
       
      }
    }
  }
`;

const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      orderId
      itemName
      itemDescription
      itemImages
      quantity
      status
      van {
        id
        name
      
      }
    }
  }
`;

export { GET_ORDER,GET_ORDERS };