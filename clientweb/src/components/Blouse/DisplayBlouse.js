import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_BLICE = gql`
  {
    blouses {
      _id
      title
    }
  }
`;

function DisplayBlouse() {
  const { loading, error, data } = useQuery(GET_BLICE, {
    fetchPolicy: "network-only",
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Display Blouse</h1>
      <div>
        {data.blouses.map((blouse) => {
          return (
            <div key={blouse._id}>
              <h4>{blouse.title}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DisplayBlouse;
