import React from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";

const Channel = () => {
    const { id } = useParams(); 
    const { channels } = useOutletContext(); 

    const channel = channels.find((channel) => channel.id === parseInt(id));

    if (!channel) {
        return <p>Channel not found.</p>;
    }

    return (
        <div>
            <h1>{channel.title}</h1>
            <p>{channel.description}</p>
            <h2>Posts</h2>
            {channel.posts && channel.posts.length > 0 ? ( 
                <ul>
                    {channel.posts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <Link to={`/post/${post.id}`}>
                                <button>View Post</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available for this channel.</p>
            )}
        </div>
    );
};

export default Channel;

