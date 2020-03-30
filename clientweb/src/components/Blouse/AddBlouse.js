import React, { useState, useCallback } from "react";
import gql from "graphql-tag";
import { useMutation } from "urql";

const ADD_BLOUSE_MUTATION = gql`
  mutation AddBlouse($title: String!, $deadline: String!) {
    addBlouse(blouseInput: { title: $title, deadline: $deadline }) {
      title
      _id
    }
  }
`;

const AddBlouse = props => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const [state, executeMutation] = useMutation(ADD_BLOUSE_MUTATION);

  const mutate = useCallback(() => {
    if (title !== "" && date !== "") {
      executeMutation({
        title,
        deadline: date
      })
        .then(() => {
          console.log("Added");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [executeMutation, title, date]);

  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <label htmlFor="date">Deadline</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button disabled={state.fetching} onClick={mutate}>
        Submit
      </button>
    </div>
  );
};

export default AddBlouse;
