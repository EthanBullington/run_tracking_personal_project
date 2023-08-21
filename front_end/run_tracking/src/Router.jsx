import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/Homepage";
import {GoalPage} from "./pages/GoalPage"
import {RunPage} from "./pages/RunPage"
import {AddRun} from "./pages/AddRunPage"
import { RunId } from "./pages/RunIdPage";
import { RacePage } from "./pages/RacePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import App from "./App";


export const router = createBrowserRouter([
    {
        path: "/",
        element: < App />,
        children: [
            {
                index: true,
                element: <RegisterPage />,
            },
            {
                path: "login",
                element: <LoginPage/>,
            },
            {
                path: "home",
                element:<HomePage/>,
            },
            {
                path: "goals",
                element:<GoalPage/>,
            },
            {
                path:"runs",
                element:<RunPage/>,
            },
            {
                path:"addrun",
                element:<AddRun/>,
            },
            {
                path:"runid/:run_id",
                element:<RunId />,
            },
            {
                path:"races",
                element:<RacePage/>
            }
        ],
    },
]);