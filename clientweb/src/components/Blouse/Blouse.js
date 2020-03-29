import React from "react";
import { useGraphqlData } from "../../hooks/fetchData";
import BlouseItems from "./BlouseItems";
import AddBlouse from "./AddBlouse";
import Axios from "axios";

const Blouse = props => {
  const [data, setData] = useGraphqlData({
    query: `
    {
        blouses {
            title
            _id
        }
    }
  `
  });

  const handleAddBlouse = async title => {
    try {
      const response = await Axios.post("/graphql", {
        query: `
        mutation {
          addBlouse(blouseInput: {title: "${title}", deadline: "${new Date().toString()}"}) {
            title
            _id
          }
        }
          `
      });
      setData([...data, response.data.data.addBlouse]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <AddBlouse handleAddBlouse={handleAddBlouse} />
      <h1>Get Blouse Details</h1>
      {data && <BlouseItems blouses={data} />}
    </div>
  );
};

export default Blouse;
