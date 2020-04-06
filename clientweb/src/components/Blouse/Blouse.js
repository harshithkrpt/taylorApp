import React, { useState, useRef } from "react";
import { storage } from "../../config/firebase";
import { v4 as uuidv4 } from "uuid";
import { isValidImage, isNotEmptyString } from "../../utils/validations";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_BLOUSE = gql`
  mutation($title: String!, $deadline: String!, $pictureUrl: String) {
    addBlouse(
      blouseInput: {
        title: $title
        deadline: $deadline
        pictureUrl: $pictureUrl
      }
    ) {
      _id
      pictureUrl
    }
  }
`;

export default (props) => {
  const [picture, setPicture] = useState("");
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
      let pictureUrl;
      if (picture) {
        await storage
          .ref(`/blouse/${unique}`)
          .put(picture)
          .then((snapshot) => {
            console.log("File Uploaded");
          });
        pictureUrl = await storage
          .ref("/blouse")
          .child(unique)
          .getDownloadURL();
      }

      const response = await addBlouse({
        variables: {
          title: titleRef.current.value,
          deadline: deadlineRef.current.value,
          pictureUrl,
        },
      });
      console.log(response);
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
