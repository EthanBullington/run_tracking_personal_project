import { useEffect, useState} from "react";
import "./App.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { createContext } from "react";
import { api } from "./utilities";

export const userContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn]= useState(false);
  const navigate = useNavigate()


  const whoAmI = async() => {
    let token = localStorage.getItem("token")
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let respone = await api('users/')
      // console.log(respone.data)
      setUser(respone.data)
      navigate('home')
    } else {
      setUser(null)
      navigate("login")
    }
  }
  useEffect(()=>{
    whoAmI()
  }, [loggedIn])

  const logOut = async() => {
    let response = await api.post('users/logout/')
    if (response.status === 204){
      localStorage.removeItem("token")
      setUser(null)
      delete api.defaults.headers.common["Authorization"]
      navigate("/login")
    }
  }

  return (
    <>
     <div id="app">
      <header>
        <nav>
          {user ?
            <>
              <Link to="/home">Home</Link>
              <button onClick={logOut}>Log out</button>
            </>
            : <>
              <Link to="/">Register</Link>
              <Link to="/login">Log In</Link>
            </>
          }
        </nav>
      </header>
      <userContext.Provider value={{ user, setUser, setLoggedIn }}>
        <Outlet />
      </userContext.Provider>
    </div>
    </>
  )
}

export default App
