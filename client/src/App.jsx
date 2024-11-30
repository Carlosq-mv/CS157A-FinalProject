import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";
import Grades from "./pages/Grades";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Navigate } from "react-router-dom";

// all routes used in web app lie here
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/enrollments" element={<Enrollments />} />
            <Route path="/grades" element={<Grades />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
