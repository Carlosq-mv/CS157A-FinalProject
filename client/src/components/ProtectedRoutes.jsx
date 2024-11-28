import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ redirectPath = "/login" }) => {
  const { isLoggedIn, loading, admin } = useContext(AuthContext)



  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!isLoggedIn || admin === null) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default ProtectedRoutes