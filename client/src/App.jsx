import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Students from "./pages/Students";

// all routes used in web app lie here
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
