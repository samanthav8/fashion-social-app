import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const App = () => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/channels")
            .then((response) => response.json())
            .then((data) => setChannels(data));
    }, []);

    return (
        <div>
            <Navbar />
            <Outlet context={{ channels }} />
        </div>
    );
};

export default App;
