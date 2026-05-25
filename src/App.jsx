import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      {/* Outlet is where React Router renders the matching child route. */}
      <Outlet />
    </>
  );
}

export default App;
