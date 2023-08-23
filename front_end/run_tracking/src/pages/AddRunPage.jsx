import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { api } from "../utilities";

export const AddRun = () => {
  const { user } = useContext(userContext);
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const addRun = async (e) => {
    e.preventDefault();
    try {
      let response = await api.post("runs/", {
        distance: distance,
        time: time,
        date: date,
      });
      navigate("/runs");
    } catch {
      alert("Could not complete function");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-6xl my-10 mb-12">{user ? user.display_name : null} want to add a run?</h1>
      <div className="text-center gap-2 justify-center border-2 rounded border-black p-2 bg-gray-300">
        <form onSubmit={(e) => addRun(e)}>
        <div className="flex flex-col text-center">
          Add Distance
          <input
            type="Distance"
            value={distance}
            placeholder="3.1"
            onChange={(e) => setDistance(e.target.value)}
            className=" bg-white border-2 text-center border-black rounded"
          />
          </div>
          <div className="flex flex-col text-center">
          Add Time
          <input
            type="runTime"
            value={time}
            placeholder="00:20:25"
            onChange={(e) => setTime(e.target.value)}
            className=" bg-white border-2 text-center border-black rounded"
          />
          </div>
          <div className="flex flex-col text-center">
          Add Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className=" bg-white border-2 text-center mb-2 border-black rounded"
          />
          <input type="submit" value="Add Run" className="border-2 mb-2 bg-white border-black p-0.5 rounded hover:bg-gray-400" />
          </div>
        </form>
      </div>
    </div>
  );
};
