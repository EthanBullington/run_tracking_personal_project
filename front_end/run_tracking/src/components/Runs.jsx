import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";


export const Run = ({ run }) => {
    const { user, minutesToTimeFormat } = useContext(userContext);
    const [hours, minutes, seconds] = run.time.split(":");
    const runTimeInMinutes = (parseInt(hours) * 60) + parseInt(minutes) + (parseInt(seconds) / 60);
    const runPace = (runTimeInMinutes/run.distance).toFixed(2)
    const runPaceTime = minutesToTimeFormat(runPace)
    const navigate = useNavigate();
  // {
  //   "id": 1,
  //   "Run Time": "00:23:12",
  //   "Run Distance": 3
  // },
  return (
    <div >
      <p>Run ID:{run.id} | Run Time:{run.time} | Run Distance:{run.distance} Miles | Run Pace {runPaceTime} Mile/Min |<button onClick={() => {navigate(`/runid/${run.id}`)}}>Edit</button></p>
    </div>
  );
};