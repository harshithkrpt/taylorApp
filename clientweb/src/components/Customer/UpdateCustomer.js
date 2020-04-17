import React, { useState } from "react";

import { UPDATE_CUSTOMER } from "../../queries/customer";
import { useMutation } from "@apollo/react-hooks";

const UpdateCustomer = ({ customerData, closeUpdateModal }) => {
  const { name, email, phoneNo, _id } = customerData;
  const [value, setValue] = useState({ name, email, phoneNo });
  const [updateCustomer, { loading }] = useMutation(UPDATE_CUSTOMER);

  const handleOnChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleUpdateModal = async (e) => {
    const newName = value.name || name;
    const newEmail = value.email || email;
    const newPhoneNo = value.phoneNo || phoneNo;
    let changed = false;
    const newCustomerDetails = {};

    if (newName !== name) {
      changed = true;
      newCustomerDetails.name = newName;
    }
    if (newEmail !== email) {
      changed = true;
      newCustomerDetails.email = newEmail;
    }
    if (newPhoneNo !== phoneNo) {
      changed = true;
      newCustomerDetails.phoneNo = newPhoneNo;
    }

    if (!changed) {
      closeUpdateModal();
      return;
    }

    // Update The Customers
    await updateCustomer({
      variables: { _id, ...newCustomerDetails },
    });
    closeUpdateModal();
  };

  return (
    <div>
      <label>Name</label>
      <input
        onChange={handleOnChange}
        name="name"
        type="text"
        value={value.name}
      />
      <label>Email</label>
      <input
        onChange={handleOnChange}
        name="email"
        type="text"
        value={value.email}
      />
      <label>PhoneNo</label>
      <input
        onChange={handleOnChange}
        name="phoneNo"
        type="text"
        value={value.phoneNo}
      />

      <button disabled={loading} onClick={closeUpdateModal}>
        Close
      </button>
      <button disabled={loading} onClick={handleUpdateModal}>
        Update
      </button>
    </div>
  );
};

export default UpdateCustomer;
