import React, { useState, useRef } from "react";
// import { v4 as uuidv4 } from "uuid";
import { isNotEmptyString } from "../../utils/validations";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_BLOUSE = gql`
  mutation($title: String!, $deadline: String!, $image: Upload) {
    addBlouse(
      blouseInput: { title: $title, deadline: $deadline, image: $image }
    ) {
      _id
    }
  }
`;

const AddBlouse = (props) => {
  const [picture, setPicture] = useState(null);
  const titleRef = useRef(null);
  const deadlineRef = useRef(null);

  // MUTATION
  const [addBlouse] = useMutation(ADD_BLOUSE);

  // Picture Change Code
  const handlePictureChange = (e) => {
    const image = e.target.files[0];
    setPicture(image);
  };

  // Submit
  const handleSubmit = async (e) => {
    if (
      !isNotEmptyString(titleRef.current.value) ||
      !isNotEmptyString(deadlineRef.current.value)
    ) {
      console.log("Enter Title And Deadline");
      return;
    }

    // const unique = `${uuidv4()}-${picture.name}`;
    try {
      // Upload The File If Exists
      console.log(picture);
      await addBlouse({
        variables: {
          title: titleRef.current.value,
          deadline: deadlineRef.current.value,
          image: picture,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <label>Title</label>
      <input type="text" ref={titleRef} />
      <label>Deadline</label>
      <input type="date" ref={deadlineRef} />
      <input type="file" onChange={handlePictureChange} accept="image/*" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddBlouse;
