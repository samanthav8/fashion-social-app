import React from 'react';
import { useOutletContext } from 'react-router-dom';

const ChannelList = () => {
    // Get channels from the Outlet context
    const { channels } = useOutletContext();

    return (
        <div className="channel-list">
            {channels.length === 0 ? (
                <p>No channels available.</p>
            ) : (
                <ul>
                    {channels.map(channel => (
                        <li key={channel.id}> 
                            <h3>{channel.title}</h3> 
                            <p>{channel.description}</p> 
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ChannelList;
