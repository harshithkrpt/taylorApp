import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_BLICE = gql`
  {
    blouses {
      _id
      title
      pictureUrl
    }
  }
`;

function DisplayBlouse() {
  const { loading, error, data } = useQuery(GET_BLICE);

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
              {blouse.pictureUrl && (
                <img alt={blouse._id} src={blouse.pictureUrl} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DisplayBlouse;
