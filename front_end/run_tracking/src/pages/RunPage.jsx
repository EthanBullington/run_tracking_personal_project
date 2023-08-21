import { useContext, useEffect, useRef, useState } from "react";
import { Run } from "../components/Runs";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { api } from "../utilities";


export const RunPage = () => {
    const { user, minutesToTimeFormat } = useContext(userContext);
    const [lastFiveRuns, setLastFiveRuns] = useState([])
    const [totalDistance, setTotalDistance] = useState('')
    const [totalTime, setTotalTime] = useState('')
    const [averagePace, setAveragePace] = useState('')
    const [searchDate, setSearchDate] = useState('')
    const navigate = useNavigate();


    useEffect( ()=>{
        api.get("users/")
            .then((response) => {
            //    console.log(response.data)
            const totalTime = response.data.total_time
            const totalTimeFormatted = minutesToTimeFormat(totalTime)
            // console.log(totalTimeFormatted)
            setTotalTime(totalTimeFormatted)
            const totalDistance = response.data.total_distance
            setTotalDistance(totalDistance)
            const averagePace = (totalTime / totalDistance).toFixed(2);
            const averagePacetime = minutesToTimeFormat(averagePace)
            setAveragePace(averagePacetime)
            })
      }, [user])

    useEffect( ()=>{
        api.get("runs/")
            .then((response) => {
            //    console.log(response.data)
            const latestRun = response.data
            if(latestRun) {
                    let lastNumber = latestRun.length 
                    let firstNumber = lastNumber - 5
                    let lastFiveRuns = latestRun.splice(firstNumber,lastNumber)
                    setLastFiveRuns(lastFiveRuns)
                } 
            })
      }, [user])
    
    

    const getRun = async(e) => {
        e.preventDefault();
        try{
            let response = await api.get(`runs/${searchDate}`)
            setLastFiveRuns(response.data)
        }
        catch (error){
            alert("Could not complete function")
        }
    }

    return (
        <>
        <h1>{user ? user.display_name : null}'s Runs</h1>
        {/* <div id="weatherapi-weather-widget-1"></div> */}
        <div>Total Distance {totalDistance} Miles| Total Runtime {totalTime}| Average Pace {averagePace}</div>
        {lastFiveRuns.map((run) =>(
            <Run key={run.id} run={run}/>
        ))}
        <div>
        <form onSubmit={(e) => getRun(e)}>
            <h5>Search for Run/Runs by Date</h5>
            <input type="date" onChange={(e) => setSearchDate(e.target.value)}/>
            <input type="submit"/>
        </form>
        </div>
        <button onClick={()=>{navigate("/addrun")}}>Add Run</button>
        </>
    )
}