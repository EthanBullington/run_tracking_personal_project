import { useEffect, useState} from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { createContext } from "react";
import { api } from "./utilities";

export const userContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn]= useState(false);
  const [home, setHome] = useState(0)
  const [goalDistance, setGoalDistance] = useState('')
  const [goalTime, setGoalTime] = useState('')
  const [i, setI] = useState(0)
  const navigate = useNavigate()

  function minutesToTimeFormat(minutes) {
    const hours = Math.floor(minutes / 60);
    const minutesRemainder = minutes % 60;
    const minutesLeft = Math.floor(minutesRemainder)
    const seconds = Math.round((minutesRemainder - minutesLeft) * 60);

    
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return timeStr;
}


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
  }, [loggedIn,home])

  const logOut = async() => {
    let response = await api.post('users/logout/')
    if (response.status === 204){
      localStorage.removeItem("token")
      setUser(null)
      setI(0)
      setGoalDistance('')
      setGoalTime('')
      delete api.defaults.headers.common["Authorization"]
      navigate("/login")
    }
  }

  return (
    <>
     <div id="app" className="w-screen h-screen bg-center bg-cover bg-[url('https://blogstudio.s3.amazonaws.com/kryjer1/f1be045fd9a22f7bb2ef2f838e503762.jpg')]">
      <header >
        <nav className="border-2 sticky border-black text-center underline flex justify-evenly bg-red-500">
          {user ?
            <>
              <Link className=" hover:text-gray-600" to="/home" >Home</Link>
              <Link className=" hover:text-gray-600" to="/goals">Goals</Link>
              <Link className=" hover:text-gray-600" to="/runs">Runs</Link>
              <Link className=" hover:text-gray-600" to="/races">Races</Link>
              <button className=" hover:text-gray-600" onClick={logOut}>Log out</button>
            </>
            : <>
              <Link className=" hover:text-gray-600" to="/">Register</Link>
              <Link className=" hover:text-gray-600" to="/login">Log In</Link>
            </>
          }
        </nav>
      </header>
      <userContext.Provider value={{ user, setUser, setLoggedIn, setHome, home, goalDistance, setGoalDistance, goalTime, setGoalTime, i, setI , minutesToTimeFormat }}>
        <Outlet />
      </userContext.Provider>
    </div>
    </>
  )
}

export default App
