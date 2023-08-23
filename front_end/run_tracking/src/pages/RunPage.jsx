import { useContext, useEffect, useState } from "react";
import { Run } from "../components/Runs";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { api } from "../utilities";

export const RunPage = () => {
  const { user, minutesToTimeFormat } = useContext(userContext);
  const [lastFiveRuns, setLastFiveRuns] = useState([]);
  const [totalDistance, setTotalDistance] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [averagePace, setAveragePace] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("users/").then((response) => {
      //    console.log(response.data)
      const totalTime = response.data.total_time;
      const totalTimeFormatted = minutesToTimeFormat(totalTime);
      // console.log(totalTimeFormatted)
      setTotalTime(totalTimeFormatted);
      const totalDistance = response.data.total_distance;
      setTotalDistance(totalDistance);
      const averagePace = (totalTime / totalDistance).toFixed(2);
      const averagePacetime = minutesToTimeFormat(averagePace);
      setAveragePace(averagePacetime);
    });
  }, [user]);

  useEffect(() => {
    api.get("runs/").then((response) => {
      //    console.log(response.data)
      const latestRun = response.data;
      if (latestRun) {
        let lastNumber = latestRun.length;
        let firstNumber = lastNumber - 5;
        let lastFiveRuns = latestRun.splice(firstNumber, lastNumber);
        setLastFiveRuns(lastFiveRuns);
      }
    });
  }, [user]);

  const getRun = async (e) => {
    e.preventDefault();
    try {
      let response = await api.get(`runs/${searchDate}`);
      setLastFiveRuns(response.data);
    } catch (error) {
      alert("Could not complete function");
    }
  };

  return (
    <div className="flex flex-col  justify-center items-center">
      <h1 className="font-bold text-6xl my-10 mb-12">
        {user ? user.display_name : null}'s Runs
      </h1>
      <div className="text-center gap-2 justify-center border-2 rounded border-black p-2 bg-gray-300">
        <div className="text-xl my-2 mb-4 underline">
          Total Distance {totalDistance} Miles | Total Runtime {totalTime} |
          Average Pace {averagePace}
        </div>
        {lastFiveRuns.map((run) => (
          <Run key={run.id} run={run} />
        ))}
        <div>
          <form
            onSubmit={(e) => getRun(e)}
            className="flex flex-col gap-2 justify-center content-center mb-4 mt-4"
          >
            Search for Run/Runs by Date
            <input
              type="date"
              onChange={(e) => setSearchDate(e.target.value)}
              className=" bg-white border-2 text-center border-black rounded"
            />
            <input
              type="submit"
              className="border-2 bg-white border-black p-0.5 rounded hover:bg-gray-400"
            />
          </form>
        </div>
        <button
          onClick={() => {
            navigate("/addrun");
          }}
          className="border-2 bg-white border-black p-0.5 rounded hover:bg-gray-400"
        >
          Add Run
        </button>
      </div>
    </div>
  );
};
