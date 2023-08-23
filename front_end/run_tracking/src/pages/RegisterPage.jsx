import { useState, useContext } from "react";
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { setLoggedIn } = useContext(userContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("username: ", userName)
  //   console.log("password: ", password)
  // }, [userName, password])

  const signUp = async (e) => {
    e.preventDefault();
    let response = await api.post("users/register/", {
      email: userName,
      password: password,
      state: state,
      age: age,
      display_name: displayName,
    });
    // let user = response.data.user
    let token = response.data.token;
    setLoggedIn(true);
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    // setUser(user)
    navigate("/home");
  };

  return (
    <div className="flex flex-col h-200 justify-center items-center">
      <h1 className="font-bold text-6xl my-10 mb-12">Sign Up</h1>
      <form onSubmit={(e) => signUp(e)} className="flex flex-col gap-2 justify-center border-2 rounded border-black content-center p-2 bg-gray-300">
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
        <input className=" bg-white border-2 text-center border-black rounded"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div className="flex flex-col text-center">
        Age
        <input className=" bg-white border-2 text-center border-black rounded"
          type="number"
          value={age}
          placeholder="23"
          onChange={(e) => setAge(e.target.value)}
        />
        </div>
        <div className="flex flex-col text-center">
        Display Name
        <input className=" bg-white border-2 text-center border-black rounded"
          type="displayName"
          value={displayName}
          placeholder="Ethan"
          onChange={(e) => setDisplayName(e.target.value)}
        />
        </div>
        <div className="flex flex-col text-center">
        State
        <input className=" bg-white border-2 text-center mb-2 border-black rounded"
          type="state"
          value={state}
          placeholder="SC"
          onChange={(e) => setState(e.target.value)}
        />
        <input type="submit" className="border-2 bg-white border-black p-0.5 rounded hover:bg-gray-400"/>
        </div>
      </form>
    </div>
  );
};
