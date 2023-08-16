import { useState, useContext, useEffect } from "react";
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";


export const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState('')
  const [state, setState] = useState('')
  const [displayName, setDisplayName] =useState("")
  const { setUser, setLoggedIn } = useContext(userContext);
  const navigate = useNavigate();
  

  // useEffect(() => {
  //   console.log("username: ", userName)
  //   console.log("password: ", password)
  // }, [userName, password])

  const signUp = async(e) => {
    e.preventDefault();
    let response = await api.post("users/register/", {
      email : userName,
      password : password,
      state : state,
      age : age,
      display_name : displayName
    });
    // let user = response.data.user 
    let token = response.data.token
    setLoggedIn(true)
    localStorage.setItem("token", token)
    api.defaults.headers.common["Authorization"] = `Token ${token}`
    // setUser(user)
    navigate("/home")
  }

  return (
    <form onSubmit={(e) => signUp(e)}>
      <h5>Sign Up</h5>
      <input
        type="email"
        value={userName}
        placeholder="email@email.com"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type='number'
        value={age}
        placeholder="age"
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="displayName"
        value={displayName}
        placeholder="Display Name"
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input
        type="state"
        value={state}
        placeholder="SC"
        onChange={(e) => setState(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};