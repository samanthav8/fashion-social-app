import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const ChannelList = () => {
    const { channels, setChannels } = useOutletContext(); 
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false); 
    const [newChannel, setNewChannel] = useState({ title: "", description: "" }); 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewChannel((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateChannel = (e) => {
        e.preventDefault();
        fetch("/channels", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newChannel),
        })
            .then((response) => response.json())
            .then((createdChannel) => {
                setChannels((prev) => [...prev, createdChannel]);
                setNewChannel({ title: "", description: "" }); 
                setShowForm(false); 
            })
            .catch((error) => console.error("Error creating channel:", error));
    };

    if (!channels || channels.length === 0) {
        return <p>Loading channels...</p>;
    }

    return (
        <div>
            <h1>Channels</h1>

            <div style={{ marginBottom: "20px" }}>
                <button onClick={() => setShowForm((prev) => !prev)}>
                    {showForm ? "Cancel" : "Create New Channel"}
                </button>

                {showForm && (
                    <form onSubmit={handleCreateChannel} style={{ marginTop: "10px" }}>
                        <label>
                            Title:
                            <input
                                type="text"
                                name="title"
                                value={newChannel.title}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={newChannel.description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>

            <ul>
                {channels.map((channel) => (
                    <li key={channel.id}>
                        <h2>{channel.title}</h2>
                        <p>{channel.description}</p>
                        <button
                            onClick={() =>
                                navigate(`/channels/${channel.id}`, { state: channel })
                            }
                        >
                            View Channel
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChannelList;
