import gql from "graphql-tag";

export const ADD_CUSTOMER = gql`
  mutation($name: String!, $email: String, $phoneNo: String!, $userId: ID!) {
    addCustomer(
      customerInput: {
        name: $name
        email: $email
        phoneNo: $phoneNo
        userId: $userId
      }
    ) {
      _id
      name
      email
      userId
      phoneNo
      userId
    }
  }
`;

export const GET_CUSTOMERS = gql`
  query($userId: ID!) {
    getCustomers(userId: $userId) {
      _id
      name
      email
      phoneNo
    }
  }
`;
