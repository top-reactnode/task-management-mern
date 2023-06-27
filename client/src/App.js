import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Home from "./pages/Home";
import Entry from "./pages/Entry";
import NewTask from "./pages/NewTask";
import Task from "./pages/Task";
import EditTask from "./pages/EditTask";
import "./App.css"

const appRouter = createBrowserRouter([
  {
    path: "/entry",
    element: <Entry />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/new_task",
    element: (
      <ProtectedRoute>
        <NewTask />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tasks/:id",
    element: (
      <ProtectedRoute>
        <Task />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tasks/:id/edit",
    element: (
      <ProtectedRoute>
        <EditTask />
      </ProtectedRoute>
    ),
  }
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
