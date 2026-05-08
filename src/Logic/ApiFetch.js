import { useEffect, useState } from "react";
import { useApiContext } from "../State/ApiContext";
import { useCategoriesContext } from "../State/CategoriesContext";

export function useApiFetch() {
  const { data, setData, baseUrl, setBaseUrl } = useApiContext();
  const { category } = useCategoriesContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category !== "") {
      setBaseUrl(baseUrl + "?topic=" + category);
    } else {
      setBaseUrl("https://gutendex.com/books");
    }
  }, [category]);

  useEffect(() => {
    const getFullData = async () => {
      setLoading(true);
      const response = await fetch(baseUrl);
      const result = await response.json();
      setData(result);
      setLoading(false);
    };
    getFullData();
  }, [baseUrl, setData]);

  return { data, loading };
}
