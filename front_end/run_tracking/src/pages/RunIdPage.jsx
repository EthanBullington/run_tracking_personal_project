import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../App";
import { api } from "../utilities";



export const RunId = () => {
    const { user } = useContext(userContext);
    const [runDistance, setRunDistance] = useState('')
    const [runTime, setRunTime] = useState('')
    const [runDate, setRunDate] = useState('')
    const {run_id} = useParams()
    const navigate = useNavigate();

    useEffect( ()=>{
        api.get(`runs/${run_id}`)
            .then((response) => {
            //    console.log(response.data.time)
               setRunTime(response.data.time)
               setRunDistance(response.data.distance)
               setRunDate(response.data.date)
            })
      }, [user])

    const deleteRun = async() => {
            try {
            let response = await api.delete(`runs/${run_id}/`)
            navigate("/runs")
            } 
            catch {
            alert("Could not complete function")
            }
    }

    const changerun = async(e) => {
        e.preventDefault();
            try {
            let response = await api.put(`runs/${run_id}/`, {
                distance : runDistance,
                time : runTime,
                date : runDate
            });
            navigate("/runs")
            } 
            catch {
            alert("Could not complete function")
            }
    }


    return (
        <>
        <h1>Edit {user ? user.display_name : null}'s Run</h1>
        <form onSubmit={(e) => changerun(e)}>
            <h5>Change Run</h5>
            <input
                type="runDistance"
                value={runDistance}
                onChange={(e) => setRunDistance(e.target.value)}
            />
            <input
                type="runTime"
                value={runTime}
                onChange={(e) => setRunTime(e.target.value)}
            />
            <input
                type="Date"
                value={runDate}
                onChange={(e) => setRunDate(e.target.value)}
            />
            <input type="submit" value={"Save Changes"}/>
        </form>
        <button onClick={() => {deleteRun()}}>Delete Run</button>
    </>
    )

}