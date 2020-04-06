import React, { useState } from "react";
import { storage } from "../../config/firebase";

export default (props) => {
  const [picture, setPicture] = useState("");

  const handlePictureChange = (e) => {
    const image = e.target.files[0];
    setPicture(image);
  };

  // Submit
  const handleSubmit = async (e) => {
    // TODO File Validations
    console.log("Start of Upload");
    console.log(picture.name);
    const upload = storage.ref(`/image/${picture.name}`).put(picture);
    try {
      const snapshot = await upload.on("state_changed");
      console.log(snapshot);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <input type="file" onChange={handlePictureChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
