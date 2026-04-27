import { useEffect } from "react";
import { useApiContext } from "../State/ApiContext";

export function useApiFetch() {
  const { data, setData, callUrl } = useApiContext();

  useEffect(() => {
    const getFullData = async () => {
      const response = await fetch(callUrl);
      const result = await response.json();
      setData(result);
    };
    getFullData();
  }, [callUrl, setData]);

  return data;
}
