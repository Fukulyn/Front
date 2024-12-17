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
        path: "/delete", 
        element: <Delete /> 
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