import { useApiFetch } from "../Logic/ApiFetch";

export default function OutputResults() {
  const results = useApiFetch();
  console.log("RENDER", results);

  return (
    <>
      <h1>This is OutputResults</h1>
    </>
  );
}
