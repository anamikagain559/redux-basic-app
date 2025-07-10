import { createBrowserRouter } from "react-router"; // ✅ correct
import App from "@/App";
import User from "@/pages/User";
import Tasks from "@/pages/Tasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
          {
        index: true,
        element: <Tasks />,
      },
              {
        path:  "tasks",
        element: <Tasks />,
      },
      {
        path: "user",
        element: <User />,
      },
    
    ],
  },
]);

export default router;
