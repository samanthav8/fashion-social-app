import React from "react";
import { useParams } from "react-router-dom";

const Post = () => {
    const { id } = useParams();

    // Fetch post details here, or pass them down through context
    // Placeholder example:
    const post = {
        id,
        title: "Example Post Title",
        content: "Detailed content goes here...",
        comments: [
            { id: 1, content: "Great post!" },
            { id: 2, content: "Very informative." },
        ],
    };

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <h3>Comments</h3>
            <ul>
                {post.comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Post;
