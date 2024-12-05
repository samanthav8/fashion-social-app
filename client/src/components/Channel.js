import React from "react";
import { useParams, useOutletContext } from "react-router-dom";

const Channel = () => {
    const { id } = useParams(); // Get channel ID from the URL
    const { channels } = useOutletContext(); // Access channels from context

    // Find the specific channel by ID
    const channel = channels.find((channel) => channel.id === parseInt(id));

    if (!channel) {
        return <p>Channel not found.</p>;
    }

    return (
        <div>
            <h1>{channel.title}</h1>
            <p>{channel.description}</p>
        </div>
    );
};

export default Channel;
