import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layout/Header";
import Input from "../../components/common/MUI-themed/Input";
import "./Entry.css";

const Entry = () => {
  let navigate = useNavigate();

  const [loginTab, setLoginTab] = useState(true);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loginUser = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );
      localStorage.setItem("mern-task-management/user", JSON.stringify(data));
      navigate("/");
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) setErrorMsg(e.response.data.msg);
    }
    setLoading(false);
  };
  const registerUser = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/auth/register`,
        {
          username,
          password,
        }
      );
      console.log(data);
      setLoginTab(true);
    } catch (e) {
      console.log(e);
      if (e.response?.status === 400) setErrorMsg(e.response?.data?.msg);
    }
    setLoading(false);
  };
  useEffect(() => {
    setErrorMsg("");
    const form = document.querySelector("form");
    form.reset();
    setLoading(false);
  }, [loginTab]);

  return (
    <>
      <Header loggedIn={false} loginTab={loginTab} setLoginTab={setLoginTab} />
      <div className="flex justify-center items-center page-template entry">
        <form
          className="card"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            if (loginTab) {
              loginUser();
            } else registerUser();
          }}
          autoComplete="off"
        >
          <h2 className="text-center mt-8 card-title">
            {loginTab ? "Log In" : "Sign Up"}
          </h2>
          <div className="card-body">
            <div className="mb-6">
              <Input
                label="Username"
                type="text"
                val={username}
                setVal={setUsername}
                className="w-full"
                required
              />
            </div>
            <div className="mb-6">
              <Input
                label="Password"
                type="password"
                val={password}
                setVal={setPassword}
                className="w-full"
                required
              />
            </div>
            {errorMsg && (
              <div className="text-red-500 text-end text-sm err-msg">
                {errorMsg}
              </div>
            )}
            <div>
              <button className="w-full btn-primary" disabled={loading}>
                {loginTab ? "Enter" : "Join"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

Entry.defaultProps = {
  LoginTab: true,
};

export default Entry;
