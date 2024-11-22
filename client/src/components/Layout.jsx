import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  const location = useLocation();

  // render NavBar only if the current route is not '/login'
  const showNavBar = location.pathname !== '/login';

  return (
    <>
      {showNavBar && <NavBar />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
