import { useEffect, useState } from "react";
import { useApiContext } from "../State/ApiContext";

export function useApiFetch() {
  const { data, setData, callUrl } = useApiContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFullData = async () => {
      setLoading(true);
      const response = await fetch(callUrl);
      const result = await response.json();
      setData(result);
      setLoading(false);
    };
    getFullData();
  }, [callUrl, setData]);

  return { data, loading };
}
