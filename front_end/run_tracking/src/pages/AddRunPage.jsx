import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { api } from "../utilities";



export const AddRun = () => {
    const { user } = useContext(userContext);
    const [distance, setDistance] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const navigate = useNavigate();


    const addRun = async(e) => {
        e.preventDefault();
            try {
                let response = await api.post("runs/", {
                  distance : distance,
                  time : time,
                  date: date
                });
                navigate("/runs")
              } 
              catch {
                alert("Could not complete function")
              } 
        
      }


    return (
        <>
        <h1>{user ? user.display_name : null} want to add a run?</h1>
    <form onSubmit={(e) => addRun(e)}>
      <h5>Add Run</h5>
      <input
        type="Distance"
        value={distance}
        placeholder="3.1"
        onChange={(e) => setDistance(e.target.value)}
      />
      <input
        type="runTime"
        value={time}
        placeholder="00:20:25"
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input type="submit" value="Add Run"/>
    </form>
    </>
    )

}