import { apiFetch } from "../Logic/ApiFetch";
import { useApiContext } from "../State/ApiContext";

export default function OutputResults() {
  const results = apiFetch();
  console.log("RENDER", results);

  console.log(results);

  return (
    <>
      <h1>This is OutputResults</h1>
    </>
  );
}
