import { useState, useEffect } from "react";
import Axios from "axios";

export const useGraphqlData = query => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resposnse = await (await Axios.post("/graphql", query)).data.data;
        if (JSON.stringify(data) !== JSON.stringify(resposnse.blouses)) {
          setData([...resposnse.blouses]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [data, query]);

  return [data, setData];
};
