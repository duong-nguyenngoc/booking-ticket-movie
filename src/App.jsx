import { useState } from "react";
import Home from "./pages/Home/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Home />
    </>
  );
}

export default App;
