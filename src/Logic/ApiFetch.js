import { useEffect, useState } from "react";
import { useApiContext } from "../State/ApiContext";
import { useCategoriesContext } from "../State/CategoriesContext";
import { useSearchContext } from "../State/SearchContext";

export function useApiFetch() {
  const { data, setData, baseUrl, setBaseUrl } = useApiContext();
  const { category } = useCategoriesContext();
  const { search } = useSearchContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();

    if (category !== "") {
      params.set("topic", category);
    }

    if (search !== "") {
      params.set("search", search);
    }

    const query = params.toString();
    setBaseUrl(`https://gutendex.com/books${query ? `?${query}` : ""}`);
  }, [category, search, setBaseUrl]);

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
