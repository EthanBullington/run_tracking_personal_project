import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { api } from "../utilities";

export const GoalPage = () => {
  const {
    user,
    goalDistance,
    setGoalDistance,
    goalTime,
    setGoalTime,
    i,
    setI,
  } = useContext(userContext);
  const navigate = useNavigate();

  const changegoals = async (e) => {
    e.preventDefault();
    if (i > 0) {
      try {
        let response = await api.put("goals/", {
          distance: goalDistance,
          time: goalTime,
        });
        navigate("/home");
      } catch {
        alert("Could not complete function");
      }
    } else {
      try {
        let response = await api.post("goals/", {
          distance: goalDistance,
          time: goalTime,
        });
        setI(i + 1);
        navigate("/home");
      } catch {
        alert("Could not complete function");
        setI(0);
      }
    }
  };
  // console.log(i)

  return (
    <div className="flex flex-col  justify-center items-center">
      <h1 className="font-bold text-6xl my-10 mb-12">{user ? user.display_name : null}'s Goals</h1>
      <form onSubmit={(e) => changegoals(e)} className="flex flex-col gap-2 justify-center border-2 rounded border-black content-center p-2 bg-gray-300">
        <div className="flex flex-col text-center">
        Goal Distance
        <input className=" bg-white border-2 text-center border-black rounded"
          type="goalDistance"
          value={goalDistance}
          placeholder="3.1"
          onChange={(e) => setGoalDistance(e.target.value)}
        />
        </div>
        <div className="flex flex-col text-center">
        Goal Time
        <input className=" bg-white border-2 text-center border-black rounded"
          type="goalTime"
          value={goalTime}
          placeholder="00:20:25"
          onChange={(e) => setGoalTime(e.target.value)}
        />
        </div>
        <input type="submit" value={"Save Changes"} className="border-2 bg-white border-black p-0.5 rounded hover:bg-gray-400"/>
      </form>
    </div>
  );
};
