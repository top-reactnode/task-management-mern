import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("mern-task-management/user"))?.accessToken;
    const refreshToken = JSON.parse(
      localStorage.getItem("mern-task-management/user")
    )?.refreshToken;
    if (accessToken && refreshToken) setIsAuthenticated(true);
    else {
      console.log("empty localStorage, redirecting to login");
      navigate("/entry");
    }
  }, []);

  if (isAuthenticated)
    return <Layout loggedIn={isAuthenticated}>{children}</Layout>;
};

export default ProtectedRoute;
