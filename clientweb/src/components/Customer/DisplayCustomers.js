import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { getUserId } from "../../utils/getUserId";

import { GET_CUSTOMERS, DELETE_CUSTOMER } from "../../queries/customer";
import UpdateCustomer from "./UpdateCustomer";

const DisplayCustomers = () => {
  const userId = getUserId();

  const { data, loading } = useQuery(GET_CUSTOMERS, {
    variables: { userId },
  });

  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);
  const handleDeleteCustomer = async (_id) => {
    try {
      await deleteCustomer({
        variables: { _id },
        update: (store, { data }) => {
          const customers = store.readQuery({
            query: GET_CUSTOMERS,
            variables: { userId },
          });
          console.log(customers);
          if (data.deleteCustomer) {
            store.writeQuery({
              query: GET_CUSTOMERS,
              variables: { userId },
              data: {
                getCustomers: [
                  ...customers.getCustomers.filter((customer) => {
                    return customer._id !== _id;
                  }),
                ],
              },
            });
          }
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const [showmodal, setShowModal] = useState(false);
  const [updateCustomerData, setUpdateCustomerData] = useState({});

  const handleUpdateOpenModal = (customer) => {
    setShowModal(true);
    setUpdateCustomerData(customer);
  };

  const handleUpdateCloseModal = () => {
    setShowModal(false);
    setUpdateCustomerData({});
  };

  if (loading) {
    return "Loading";
  }

  return (
    <div>
      {data.getCustomers.map((customer) => (
        <div key={customer._id}>
          <h1>{customer.name}</h1>
          <button
            onClick={(e) => {
              handleDeleteCustomer(customer._id);
            }}
          >
            del
          </button>
          <button
            onClick={(e) => {
              handleUpdateOpenModal(customer);
            }}
          >
            up
          </button>
        </div>
      ))}

      <br />
      <br />
      <br />
      {showmodal && (
        <UpdateCustomer
          customerData={updateCustomerData}
          closeUpdateModal={handleUpdateCloseModal}
        />
      )}
    </div>
  );
};

export default DisplayCustomers;
