import React from "react";

const BlouseItems = ({ blouses }) => {
  return (
    <ul>
      {blouses.map(blouse => {
        return <li key={blouse._id}>{blouse.title}</li>;
      })}
    </ul>
  );
};

export default BlouseItems;
