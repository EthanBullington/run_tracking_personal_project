import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../App";
import { api } from "../utilities";

export const Race = ({race}) => {
    const [userAdded, setUserAdded] = useState(false)
    const navigate = useNavigate();

    useEffect( ()=>{
        api.get(`races/user/${race.race.race_id}/`)
            .then((response) => {
                setUserAdded(!!response.data);
            
            })
      }, [])

    const addRun = async() => {
        try {
            let response = await api.post(`races/${race.race.race_id}/`);
            navigate("/home")
            } 
            catch {
            alert("Could not complete function")
            }
    }


    return(
        <div>
        <p>{race.race.name} | {race.race.next_date} | {race.race.url} | <button className="border-2 p-1 bg-white border-black rounded hover:bg-gray-400 disabled:bg-slate-950 disabled:text-white disabled:border-gray-600" disabled={userAdded} onClick={addRun}>Add Race</button></p>
        </div>
    )
}