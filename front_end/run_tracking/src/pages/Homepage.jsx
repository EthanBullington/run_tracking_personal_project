import { useContext, useEffect, useRef, useState } from "react";
import { UserRace } from "../components/UserRaces";
import { userContext } from "../App";
import { api } from "../utilities";
import axios from "axios";


export const HomePage = () => {
  const {
    user,
    setHome,
    home,
    goalTime,
    setGoalTime,
    goalDistance,
    setGoalDistance,
    i,
    setI,
    minutesToTimeFormat,
  } = useContext(userContext);
  const [zipcode, setZipcode] = useState("");
  const [icon, setIcon] = useState("");
  const [currTemp, setCurrTemp] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [weatherName, setWeatherName] = useState("");
  const [goalPace, setGoalPace] = useState("");
  const [runPace, setRunPace] = useState("");
  const [runTime, setRunTime] = useState("");
  const [runDistance, setRunDistance] = useState("");
  const [runDate, setRunDate] = useState("");
  const [userRaces, setUserRaces] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const isRender = useRef(false);

  useEffect(() => {
    setHome(home + 1);
  }, []);

  
  const weatherZipcode = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=${import.meta.env.VITE_API_KEY}`
      );
      let lat = response.data.lat;
      let long = response.data.lon;
      setZipcode("");
      //   console.log(lat)
      //   console.log(long)
      let response_weather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${import.meta.env.VITE_API_KEY}`
      );
      //   console.log(response_weather.data)
      //   console.log(response_weather.data.main.temp)
      setCurrTemp(response_weather.data.main.temp);
      setFeelsLike(response_weather.data.main.feels_like);
      setIcon(response_weather.data.weather[0]);
      setWeatherName(response_weather.data["name"]);
      //   console.log(weatherName)
    } catch {
      alert("Could not complete login function");
    }
  };
  useEffect(() => {
    if (isRender.current) {
      api
        .get("goals/")
        .then((response) => {
          const goalDistance = response.data.distance;
          setGoalDistance(goalDistance);
          const goalTime = response.data.time;
          setGoalTime(goalTime);
          const [hours, minutes, seconds] = goalTime.split(":");
          const goalTimeInMinutes =
            parseInt(hours) * 60 + parseInt(minutes) + parseInt(seconds) / 60;
          const goalPace = (goalTimeInMinutes / goalDistance).toFixed(2);
          const goalPaceTime = minutesToTimeFormat(goalPace);
          setGoalPace(goalPaceTime);
          setErrorMsg("");
          setI(i + 1);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setErrorMsg("Goal data not found.");
          } else {
            setErrorMsg("An error occurred while fetching goal data.");
            console.error("Error fetching data:", error);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    if (isRender.current) {
      api.get("runs/").then((response) => {
        //    console.log(response.data)
        const latestRun = response.data.pop();
        if (latestRun) {
          const runDistance = latestRun.distance;
          setRunDistance(runDistance);
          // console.log(runDistance)
          const runTime = latestRun.time;
          setRunTime(runTime);
          const runDate = latestRun.date;
          setRunDate(runDate);
          const [hours, minutes, seconds] = runTime.split(":");
          const runTimeInMinutes =
            parseInt(hours) * 60 + parseInt(minutes) + parseInt(seconds) / 60;
          const runPace = (runTimeInMinutes / runDistance).toFixed(2);
          const runPaceTime = minutesToTimeFormat(runPace);
          setRunPace(runPaceTime);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (isRender.current) {
      api.get("races/user/").then((response) => {
        const latestrace = response.data;
        setUserRaces(latestrace);
      });
    } else {
      isRender.current = true;
    }
  }, [user]);

  return (
    <div className="flex flex-col  justify-center items-center">
      <div className="my-10 mb-12">
        <h1 className="font-bold text-6xl">
          Welcome {user ? user.display_name : null}!
        </h1>
      </div>
      <div className=" flex flex-col text-center items-center rounded h-fit border-2 border-black content-center p-2 bg-gray-300">
        <div>
          Current Wheather By Zipcode
          <form onSubmit={(e) => weatherZipcode(e)} className="flex flex-row gap-1 justify-center">
            <input className=" bg-white border-2 text-center border-black rounded"
              type="zipcode"
              value={zipcode}
              placeholder="29212"
              onChange={(e) => setZipcode(e.target.value)}
            />
            <input type="submit" className="border-2 bg-white border-black p-0.5 rounded hover:bg-gray-400"/>
          </form>
          {icon && (
            <div className="bg-white m-2 border-2 border-black rounded">
              <img
                src={`https://openweathermap.org/img/wn/${icon.icon}@2x.png`}
                className="px-28"
                alt="Weather Icon"
              />
              <div>{icon.description}</div>
              <div>{weatherName}</div>
              Current Temp {currTemp} | Feels Like {feelsLike}
            </div>
          )}
        </div>
        <div className="mb-2 mt-2">
          <p className=" text-xl">Goals</p>
          {goalDistance.length !== 0 ? (
            <div>
              <p>
                Goal Distance is {goalDistance} Miles | Goal Time {goalTime} |
                Goal Pace {goalPace} Mile/Min
              </p>
            </div>
          ) : (
            <p>No goal information available.</p>
          )}
        </div>
        <div className="mb-2 mt-2">
          <p className=" text-xl">Last Run</p>
          {runDistance.length !== 0 ? (
            <div>
              <p>
                Run Distance is {runDistance} Miles | Run Time {runTime} | Run
                Pace {runPace} Mile/Min | Run Date {runDate}
              </p>
            </div>
          ) : (
            <p>No run information available.</p>
          )}
        </div>
        <div>
          <p className=" text-xl">Upcoming Races</p>
          {userRaces.length !== 0 ? (
            userRaces.map((race, index) => <UserRace key={index} race={race} />)
          ) : (
            <p>No races available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
