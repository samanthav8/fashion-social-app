import App from "./App";
import Home from "./Home";
import Channel from "./Channel";
import ChannelList from "./ChannelList";
import Post from "./Post";
import Profile from "./Profile";

const routes = [
    {
        path: "/",
        element: <App />, // Main App component with Navbar and Outlet
        children: [
            {
                path: "/", // Home route
                element: <Home />, // Your Home component
            },
            {
                path: "channels",
                element: <ChannelList />,
            },
            {
                path: "channels/:id",
                element: <Channel />,
            },
            {
                path: "post/:id",
                element: <Post />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
];
export default routes;

