import { useContext } from "react";
import { userContext } from "../App";
import { api } from "../utilities";

export const UserRace = ({ race }) => {
  const { setHome } = useContext(userContext);

  const deleteRace = async () => {
    try {
      let response = await api.delete(`races/user/${race.race_id}/`);
      setHome(0);
    } catch {
      alert("Could not complete function");
    }
  };

  return (
    <div>
      <p>
        {race.name} | {race.next_end_date} | {race.url} |{" "}
        <button
          className="border-2 p-1 bg-white border-black rounded hover:bg-gray-400"
          onClick={deleteRace}
        >
          Remove Run
        </button>
      </p>
    </div>
  );
};
