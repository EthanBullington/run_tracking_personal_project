import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { api } from "../utilities";



export const GoalPage = () => {
    const { user, goalDistance, setGoalDistance, goalTime, setGoalTime, i, setI} = useContext(userContext);
    const navigate = useNavigate();
    

    const changegoals = async(e) => {
        e.preventDefault();
        if(i > 0) {
            try {
            let response = await api.put("goals/", {
                distance : goalDistance,
                time : goalTime
            });
            navigate("/home")
            } 
            catch {
            alert("Could not complete function")
            }
        }else {
            try {
                let response = await api.post("goals/", {
                  distance : goalDistance,
                  time : goalTime
                });
                setI(i+1)
                navigate("/home")
              } 
              catch {
                alert("Could not complete function")
                setI(0)
              } 
        }
      }
      // console.log(i)

    return (
        <>
        <h1>{user ? user.display_name : null}'s Goals</h1>
    <form onSubmit={(e) => changegoals(e)}>
      <h5>Change Goals</h5>
      <input
        type="goalDistance"
        value={goalDistance}
        placeholder="3.1"
        onChange={(e) => setGoalDistance(e.target.value)}
      />
      <input
        type="goalTime"
        value={goalTime}
        placeholder="00:20:25"
        onChange={(e) => setGoalTime(e.target.value)}
      />
      <input type="submit" value={"Save Changes"}/>
    </form>
    </>
    )
}