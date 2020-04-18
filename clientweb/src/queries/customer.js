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
      phoneNo
      userId
      measurementId
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
      userId
      measurementId
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation($_id: ID!) {
    deleteCustomer(_id: $_id)
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation($_id: ID!, $name: String, $email: String, $phoneNo: String) {
    updateCustomer(
      _id: $_id
      customerInput: { name: $name, email: $email, phoneNo: $phoneNo }
    ) {
      _id
      name
      email
      phoneNo
      userId
      measurementId
    }
  }
`;
