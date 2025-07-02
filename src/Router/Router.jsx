import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Home from "../Pages/Home"
import VideoDis from "../Pages/VideoDis"
import Video from "../Pages/Video"
import Login from "../Pages/Login"
import SignUp from "../Pages/SignUp"
import Navbar from "../components/Navbar"


function Layout() {
  return (
    <>
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element:  <Home/> },
      //{ path: "/home", element: <Home/>},
      //{ path: "/singup", element: <SignUp/>},
{ path: "/video/:id", element: <Video/>},
    ],
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router