import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = ({ loggedIn, children }) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <div className="page-template">
        <Outlet />
        {children}
      </div>
    </>
  );
};

export default Layout;
