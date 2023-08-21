import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../App";
import { api } from "../utilities";

export const UserRace = ({race}) => {
    const { setHome } = useContext(userContext);
    const [userAdded, setUserAdded] = useState(false)
    const navigate = useNavigate();
    

    

    const deleteRace = async() => {
        try {
            let response = await api.delete(`races/user/${race.race_id}/`);
            setHome(0)
            } 
        catch {
            alert("Could not complete function")
            }
    }


    return(
        <div>
        <p>{race.name} | {race.next_date} | {race.url} | <button onClick={deleteRace}>Remove Run</button></p>
        </div>
    )
}