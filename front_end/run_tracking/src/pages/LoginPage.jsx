import { useState, useContext } from "react";
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

export const LoginPage = (e) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setLoggedIn } = useContext(userContext);
  const navigate = useNavigate();

  const logIn = async(e) => {
    e.preventDefault();
    try {
      let response = await api.post("users/login/", {
        email : userName,
        password : password
      });
      // let user = response.data
      let token = response.data.token
      // console.log(response.data)
      // setUser(user)
      setLoggedIn(true)
      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      navigate("/home")
    } 
    catch {
      alert("Could not complete login function")
    }
  }

  return (
    <form onSubmit={(e) => logIn(e)}>
      <h5>Log In</h5>
      <input
        type="email"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};