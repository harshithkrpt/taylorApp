import React from "react";
import BlouseItems from "./BlouseItems";
import AddBlouse from "./AddBlouse";
import { useQuery } from "urql";
import gql from "graphql-tag";

export const BLOUSE_QUERY = gql`
  {
    blouses {
      _id
      title
    }
  }
`;

const Blouse = props => {
  const [result] = useQuery({ query: BLOUSE_QUERY });

  if (result.fetching) return <div>Fetching</div>;

  return (
    <div>
      <AddBlouse />
      <h1>Get Blouse Details</h1>
      <BlouseItems blouses={result.data.blouses} />
    </div>
  );
};

export default Blouse;
