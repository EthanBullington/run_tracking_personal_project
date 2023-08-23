import { useContext, useEffect, useState } from "react";
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
        <div className="flex flex-col  justify-center items-center">
        <h1 className="font-bold text-6xl my-10 mb-12">Edit {user ? user.display_name : null}'s Run</h1>
        <div className="text-center gap-2 justify-center border-2 rounded border-black p-2 bg-gray-300">
            <form onSubmit={(e) => changerun(e)}>
                <div className="flex flex-col text-center">
                Edit Distance
                <input
                    type="runDistance"
                    value={runDistance}
                    onChange={(e) => setRunDistance(e.target.value)}
                    className=" bg-white border-2 text-center border-black rounded"
                />
                </div>
                <div className="flex flex-col text-center">
                Edit Time
                <input
                    type="runTime"
                    value={runTime}
                    onChange={(e) => setRunTime(e.target.value)}
                    className=" bg-white border-2 text-center border-black rounded"
                />
                </div>
                <div className="flex flex-col text-center">
                Edit Date
                <input
                    type="Date"
                    value={runDate}
                    onChange={(e) => setRunDate(e.target.value)}
                    className=" bg-white border-2 text-center border-black rounded mb-2"
                />
                <input type="submit" value={"Save Changes"} className="border-2 mb-2 bg-white border-black p-0.5 rounded hover:bg-gray-400"/>
                </div>
            </form>
            <button onClick={() => {deleteRun()}} className="border-2 bg-white border-black p-0.5 rounded hover:bg-gray-400">Delete Run</button>
        </div>
    </div>
    )

}