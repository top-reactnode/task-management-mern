import { useNavigate } from "react-router-dom";
import "./layout.css";

const Header = ({ loggedIn, loginTab, setLoginTab }) => {
  let navigate = useNavigate();

  return (
    <div className="header flex justify-between items-center px-6 bg-white">
      <h2
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        Task Manager
      </h2>
      {!loggedIn ? (
        <div className="header_btn-grp">
          <button
            className={loginTab ? "text-blue" : ""}
            onClick={() => setLoginTab(true)}
          >
            Log In
          </button>
          <button
            className={!loginTab ? "text-blue" : ""}
            onClick={() => setLoginTab(false)}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="header_btn-grp">
          <button
            className="text-dark"
            onClick={() => {
              localStorage.removeItem("mern-task-management/user");
              navigate("/entry");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

Header.defaultProps = {
  loggedIn: false,
  loginTab: true,
  setLoginTab: () => {},
};

export default Header;
