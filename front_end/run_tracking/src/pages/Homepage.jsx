import { useContext, useEffect, useRef, useState } from "react";
import { UserRace } from "../components/UserRaces";
import { userContext } from "../App";
import { api } from "../utilities";


export const HomePage = () => {
  const { user, setLoggedIn, setHome, home, goalTime, setGoalTime, goalDistance, setGoalDistance, i, setI, minutesToTimeFormat} = useContext(userContext);
  const [goalPace, setGoalPace] = useState('')
  const [runPace, setRunPace] = useState('')
  const [runTime, setRunTime] = useState('')
  const [runDistance, setRunDistance] = useState('')
  const [runDate, setRunDate] = useState('')
  const [userRaces, setUserRaces] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const isRender = useRef(false)

  useEffect(()=>{
    setHome(home+1)
  }, [])

  useEffect(() => {
    if (isRender.current) {
        api.get("goals/")
            .then((response) => {
                const goalDistance = response.data.distance;
                setGoalDistance(goalDistance);
                const goalTime = response.data.time;
                setGoalTime(goalTime);
                const [hours, minutes, seconds] = goalTime.split(":");
                const goalTimeInMinutes = (parseInt(hours) * 60) + parseInt(minutes) + (parseInt(seconds) / 60);
                const goalPace = (goalTimeInMinutes / goalDistance).toFixed(2);
                const goalPaceTime = minutesToTimeFormat(goalPace)
                setGoalPace(goalPaceTime);
                setErrorMsg('');
                setI(i+1)
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

  useEffect( ()=>{
    if (isRender.current){
    api.get("runs/")
        .then((response) => {
        //    console.log(response.data)
        const latestRun = response.data.pop()
        if(latestRun) {
            const runDistance = latestRun.distance
            setRunDistance(runDistance)
            // console.log(runDistance)
            const runTime = latestRun.time
            setRunTime(runTime)
            const runDate = latestRun.date
            setRunDate(runDate)
            const [hours, minutes, seconds] = runTime.split(":");
            const runTimeInMinutes = (parseInt(hours) * 60) + parseInt(minutes) + (parseInt(seconds) / 60);
            const runPace = (runTimeInMinutes/runDistance).toFixed(2)
            const runPaceTime = minutesToTimeFormat(runPace)
            setRunPace(runPaceTime)
            } 
        })
    }
  }, [user])

  useEffect( ()=>{
    if (isRender.current){
    api.get("races/user/")
    .then((response) => {
       const latestrace = response.data
        setUserRaces(latestrace)
       }
      )
    }else {
        isRender.current = true
    }
  }, [user])

  return (
    <>
    <div>
      <h1>Welcome {user ? user.display_name : null}</h1>
    </div>
    <div>
    Goals
            {goalDistance.length !== 0 ? (
                <div>
                    <p>Goal Distance is {goalDistance} Miles | Goal Time {goalTime} | Goal Pace {goalPace} Mile/Min</p>
                </div>
            ) : (
                <p>No goal information available.</p>
            )}
    </div>
    <div>
    Last Run
            {runDistance.length !== 0 ? (
                <div>
                    <p>Run Distance is {runDistance} Miles | Run Time {runTime} | Run Pace {runPace} Mile/Min | Run Date {runDate}</p>
                </div>
            ) : (
                <p>No run information available.</p>
            )}
    </div>
    <div>
    Upcoming Race
    {userRaces.length !== 0 ? (
        userRaces.map((race, index) => (
            <UserRace key={index} race={race} />
        ))
    ) : (
        <p>{errorMsg ? errorMsg : "No races available."}</p>
    )}
    </div>
    </>
  );
};