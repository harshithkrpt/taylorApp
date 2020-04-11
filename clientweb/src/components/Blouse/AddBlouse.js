import React, { useState, useRef } from "react";
import firebase from "../../config/firebase";
import { v4 as uuidv4 } from "uuid";
import { isValidImage, isNotEmptyString } from "../../utils/validations";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_BLOUSE = gql`
  mutation($title: String!, $deadline: String!, $image: String) {
    addBlouse(
      blouseInput: { title: $title, deadline: $deadline, image: $image }
    ) {
      _id
      image
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

    if (!isValidImage(picture.size)) {
      console.log("Image Size Should Be Less Than 4MB");
      return;
    }

    const unique = `${uuidv4()}-${picture.name}`;
    try {
      // Upload The File If Exists
      let image;
      if (picture) {
        await firebase
          .storage()
          .ref(`/blouse/${unique}`)
          .put(picture)
          .then((snapshot) => {
            console.log("File Uploaded");
          });
        image = await firebase
          .storage()
          .ref("/blouse")
          .child(unique)
          .getDownloadURL();
      }

      await addBlouse({
        variables: {
          title: titleRef.current.value,
          deadline: deadlineRef.current.value,
          image,
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