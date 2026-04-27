import { use, useEffect, useState } from "react";
import { useApiContext } from "../State/ApiContext";

export function apiFetch() {
  const { data, handleData, callUrl } = useApiContext();

  (useEffect(() => {
    console.log("EFFECT RUNNING");
    const getFullData = async () => {
      console.log("FETCHING...");
      const response = await fetch(callUrl);
      const result = await response.json();
      handleData(result);
    };
    getFullData();
  }),
    [callUrl]);

  return data;
}
