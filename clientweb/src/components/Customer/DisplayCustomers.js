import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { getUserId } from "../../utils/getUserId";

import { GET_CUSTOMERS } from "../../queries/customer";

const DisplayCustomers = () => {
  const userId = getUserId();
  const { data, loading } = useQuery(GET_CUSTOMERS, {
    variables: { userId },
  });
  if (loading) {
    return "Loading";
  }

  return (
    <div>
      {data.getCustomers.map((customer) => (
        <h1 key={customer._id}>{customer.name}</h1>
      ))}
    </div>
  );
};

export default DisplayCustomers;
