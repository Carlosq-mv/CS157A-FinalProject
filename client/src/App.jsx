import { Routes, Route } from "react-router-dom";

import ExamplePage from "./pages/ExamplePage";

// all routes used in web app lie here
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <ExamplePage /> } />
      </Routes>
    </>
  );
}

export default App;
