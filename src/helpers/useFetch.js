import  { useEffect, useState } from "react";

const useFetch = (URL,id) => {
  const [data, setData] = useState(1);

  useEffect(() => {
    const CURR_URL = URL + id;
    console.log(CURR_URL)
    fetch(CURR_URL)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [id]);

  return data;
};


export default useFetch;
