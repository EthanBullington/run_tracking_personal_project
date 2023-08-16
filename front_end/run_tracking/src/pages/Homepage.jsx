import { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../App";
import { api } from "../utilities";


export const HomePage = () => {
  const { user} = useContext(userContext);
  const [goalDistance, setGoalDistance] = useState('')
  const [goalTime, setGoalTime] = useState('')
  const [goalPace, setGoalPace] = useState('')
  const [runPace, setRunPace] = useState('')
  const [runTime, setRunTime] = useState('')
  const [runDistance, setRunDistance] = useState('')
  const [runDate, setRunDate] = useState('')
  const [raceUrl, setRaceUrl] = useState('')
  const [raceName, setRaceName] = useState('')
  const [raceDate, setRaceDate] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const isRender = useRef(false)
  

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
                setGoalPace(goalPace);
                setErrorMsg('');
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
            setRunPace(runPace)
            } 
        })
    }
  }, [user])

  useEffect( ()=>{
    if (isRender.current){
    api.get("races/user/")
    .then((response) => {
    //    console.log(response.data)
       const latestrace = response.data
       if (latestrace.length > 0) {
        setRaceDate(latestrace[0].next_end_date)
       setRaceName(latestrace[0].name)
       setRaceUrl(latestrace[0].url)
       }
      })
    }else {
        isRender.current = true
    }
  }, [user])

  return (
    <>
    <div>
      <h1>Welcome {user ? user.display_name : null}</h1>
    </div>
    {/* <div id="weatherapi-weather-widget-1"></div> */}
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
    {raceName.length !== 0 ? (
                <div>
                    <div>Race Name {raceName} | Race URL {raceUrl} | Race Date {raceDate}</div>
                </div>
            ) : (
                <p>{errorMsg}</p>
            )}
    </div>
    </>
  );
};