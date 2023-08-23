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
    <div className="flex flex-col h-200 justify-center items-center">
      <h1 className="font-bold text-6xl my-10 mb-12">Login</h1>
      <form onSubmit={(e) => logIn(e)} className="flex flex-col gap-2 justify-center border-2 rounded border-black content-center p-2 bg-gray-300">
        <div className="flex flex-col text-center">
        Email
        <input className=" bg-white border-2 text-center border-black rounded"
          type="email"
          value={userName}
          placeholder="email@email.com"
          onChange={(e) => setUserName(e.target.value)}
        />
        </div>
        <div className="flex flex-col text-center">
        Password
        <input className=" bg-white border-2 text-center mb-2 border-black rounded"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" className="border-2 bg-white border-black p-0.5 rounded hover:bg-gray-400"/>
        </div>
      </form>
    </div>
  );
};