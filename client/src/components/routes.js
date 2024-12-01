import App from "./App";
import Home from "./Home";
import Channel from "./Channel";
import ChannelList from "./ChannelList";
import Post from "./Post";
import Profile from "./Profile";

const routes = [
    {
        path: "/",
        element: <App />, // Main app component
        children: [
            {
                path: "/", // Home route
                element: <Home />,
            },
            {
                path: "channels", // Channel list route
                element: <ChannelList />,
            },
            {
                path: "channels/:id", // Individual channel route
                element: <Channel />,
            },
            {
                path: "post", // Post route
                element: <Post />,
            },
            {
                path: "profile", // Profile route
                element: <Profile />,
            },
        ],
    },
];

export default routes;
