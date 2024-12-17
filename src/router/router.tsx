import { createHashRouter } from "react-router";
import App from '../view/App';
import Delete from "../view/Delete";
import Add from "../view/Add";
import UpdateName from "../view/Update";

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },

    {
        path: "/delete", // 分頁名稱 => localhost:5173/#/delete
        element: <Delete /> // 根據Delete.tsx的export name
    },

    {
        path: "/Add",
        element: <Add />
    },

    {
        path: "/Update",
        element: <UpdateName/>
    }
])