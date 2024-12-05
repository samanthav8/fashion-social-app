import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const ChannelList = () => {
    const { channels } = useOutletContext(); // Access the channels data from context
    const navigate = useNavigate(); // For navigation to specific channel

    if (!channels || channels.length === 0) {
        return <p>Loading channels...</p>;
    }

    return (
        <div>
            <h1>Channels</h1>
            <ul>
                {channels.map((channel) => (
                    <li key={channel.id}>
                        <h2>{channel.title}</h2>
                        <p>{channel.description}</p>
                        <button onClick={() => navigate(`/channels/${channel.id}`, { state: channel })}>
                            View Channel
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChannelList;
