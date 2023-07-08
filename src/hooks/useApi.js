import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);

  const request = async (...args) => {
    setloading(true);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>", args);
    const response = await apiFunc(...args);
    setloading(false);

    setError(!response.ok);
    setData(response.data);

    return response;
  };

  return { data, error, setData, loading, request };
};
