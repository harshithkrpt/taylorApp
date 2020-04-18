import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { GET_MEASUREMENT } from "../../queries/measurement";
import AddMeasurement from "./AddMeasurement";

const GetMeasurement = ({ measurementId }) => {
  const { data, loading } = useQuery(GET_MEASUREMENT, {
    variables: { measurementId },
  });
  if (loading) {
    return "loading";
  }

  const { neckSize, handSize, waistSize } = data.getMeasurement;
  return (
    <div>
      <ul>
        <li>Neck Size : {neckSize}</li>
        <li>Hand Size : {handSize}</li>
        <li>Waist Size : {waistSize}</li>
      </ul>
    </div>
  );
};

const Measurement = ({ measurementId, customerId }) => {
  if (!measurementId) return <AddMeasurement customerId={customerId} />;
  return <GetMeasurement measurementId={measurementId} />;
};

export default Measurement;
