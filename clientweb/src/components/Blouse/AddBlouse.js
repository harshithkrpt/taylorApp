import React, { useRef } from "react";

const AddBlouse = ({ handleAddBlouse }) => {
  const title = useRef(null);

  return (
    <div>
      <label htmlFor="title">Title</label>
      <input type="text" ref={title} />
      <button
        onClick={e => {
          handleAddBlouse(title.current.value);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default AddBlouse;
