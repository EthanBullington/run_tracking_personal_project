import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Race } from "../components/Race";
import { userContext } from "../App";
import { api } from "../utilities";



export const RacePage = () => {
    const { user } = useContext(userContext);
    const [races, setRaces] = useState([])


    useEffect( ()=>{
        api.get("races/")
            .then((response) => {
                // console.log(response.data)
                let races_pull = response.data['races']
                races_pull = races_pull.splice(0,20)
                setRaces(races_pull)
                console.log(races)
            
            })
      }, [])

    return (
        <>
        <h1>Upcoming Races</h1>
        {races.map((race, index) =>(
            <Race key={index} race={race}/>
        ))}
        </>
    )


}