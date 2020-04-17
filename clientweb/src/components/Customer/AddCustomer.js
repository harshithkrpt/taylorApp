import React, { useRef } from "react";
import { useMutation } from "@apollo/react-hooks";

import { getUserId } from "../../utils/getUserId";

import { ADD_CUSTOMER, GET_CUSTOMERS } from "../../queries/customer";

const AddCustomer = (props) => {
  const [addCustomer] = useMutation(ADD_CUSTOMER);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNoRef = useRef(null);

  const handleSubmit = async (e) => {
    const userId = getUserId();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phoneNo = phoneNoRef.current.value;

    await addCustomer({
      variables: { name, email, phoneNo, userId },
      update: (store, { data }) => {
        console.log(data);
        const oldData = store.readQuery({
          query: GET_CUSTOMERS,
          variables: { userId },
        });
        store.writeQuery({
          query: GET_CUSTOMERS,
          variables: { userId },
          data: {
            getCustomers: [...oldData.getCustomers, data.addCustomer],
          },
        });
        props.history.push("/display_customers");
      },
    });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <h1>Add Customer</h1>
      <br />
      <input type="text" ref={nameRef} placeholder="Name" />
      <input type="text" ref={emailRef} placeholder="Email" />
      <input type="text" ref={phoneNoRef} placeholder="PhoneNumber" />
      <button onClick={handleSubmit}>Add Customer</button>
    </div>
  );
};

export default AddCustomer;
