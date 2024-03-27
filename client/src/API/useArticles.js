import { useState, useEffect } from "react";
import axios from "axios";

// Zmienna zawierająca bazowy URL do API
const API_BASE_URL = "http://localhost:5000";

// Ścieżka do API
const API_PATH = "/articles";

// data toSend to albo ID dla delete albo obiekt z danymi dla POSTA
const useArticles = (method, dataToSend) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { id, ...articleWithoutId } = dataToSend || {};
        setLoading(true);
        setError(null);
        setData([]);
        const config = {
          method,
          url: `${API_BASE_URL}${API_PATH}${id ? `/${id}` : ""}`,
          data: method === "POST" ? articleWithoutId : undefined,
        };
        const response = await axios(config);

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [method, dataToSend]); // Dependency array includes the 'method' and 'dataToSend' variables

  return { data, loading, error };
};

export default useArticles;
