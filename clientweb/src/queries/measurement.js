import gql from "graphql-tag";

export const ADD_MEASUREMENT = gql`
  mutation($_id: ID!, $neckSize: Int!, $handSize: Int!, $waistSize: Int!) {
    addMeasurement(
      _id: $_id
      measurementInput: {
        neckSize: $neckSize
        handSize: $handSize
        waistSize: $waistSize
      }
    ) {
      _id
      neckSize
      handSize
      waistSize
    }
  }
`;

export const GET_MEASUREMENT = gql`
  query($customerId: ID, $measurementId: ID) {
    getMeasurement(customerId: $customerId, measurementId: $measurementId) {
      _id
      neckSize
      handSize
      waistSize
    }
  }
`;
