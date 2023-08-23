import { useEffect, useState, useContext } from "react";
import { Race } from "../components/Race";
import { userContext } from "../App";
import { api } from "../utilities";

export const RacePage = () => {
  const { user } = useContext(userContext);
  const [races, setRaces] = useState([]);

  useEffect(() => {
    api.get("races/").then((response) => {
      // console.log(response.data)
      let races_pull = response.data["races"];
      setRaces(races_pull);
      console.log(races);
    });
  }, []);

  return (
    <div className="flex flex-col h-200 justify-center items-center">
      <h1 className="font-bold text-6xl my-10 mb-12">
        Upcoming Races in {user.state}
      </h1>
      <div className="h-[300px] overflow-y-auto text-center gap-2 justify-center border-2 rounded border-black p-2 bg-gray-300">
        {races.map((race, index) => (
          <Race key={index} race={race} />
        ))}
      </div>
    </div>
  );
};
