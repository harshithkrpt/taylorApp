import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { ADD_MEASUREMENT, GET_MEASUREMENT } from "../../queries/measurement";
import { GET_CUSTOMERS } from "../../queries/customer";
import { getUserId } from "../../utils/getUserId";

const AddMeasurement = ({ customerId }) => {
  const [value, setValue] = useState({
    waistSize: 0,
    neckSize: 0,
    handSize: 0,
  });
  const [addMeasurement, { loading }] = useMutation(ADD_MEASUREMENT);
  const handleSubmit = async (e) => {
    const { neckSize, handSize, waistSize } = value;
    await addMeasurement({
      variables: { _id: customerId, neckSize, handSize, waistSize },
      update: (store, { data }) => {
        const userId = getUserId();
        const oldCustomers = store.readQuery({
          query: GET_CUSTOMERS,
          variables: { userId },
        });

        store.writeQuery({
          query: GET_CUSTOMERS,
          variables: { userId },
          data: {
            getCustomers: [
              ...oldCustomers.getCustomers.map((customer) => {
                if (customer._id === customerId) {
                  const newCustomer = { ...customer };
                  newCustomer.measurementId = data.addMeasurement._id;
                  return newCustomer;
                }
                return customer;
              }),
            ],
          },
        });

        store.writeQuery({
          query: GET_MEASUREMENT,
          variables: { measurementId: data.addMeasurement._id },
          data: {
            getMeasurement: {
              ...data.addMeasurement,
            },
          },
        });
      },
    });
  };

  const handleChange = async (e) => {
    setValue({ ...value, [e.target.name]: +e.target.value });
  };

  return (
    <div>
      <input
        type="number"
        name="handSize"
        onChange={handleChange}
        placeholder="HandSize"
      />
      <input
        type="number"
        name="waistSize"
        onChange={handleChange}
        placeholder="WaistSize"
      />
      <input
        type="number"
        name="neckSize"
        onChange={handleChange}
        placeholder="NeckSize"
      />
      <button disabled={loading} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AddMeasurement;
