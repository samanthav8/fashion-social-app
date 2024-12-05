import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
    const { id } = useParams(); 
    const [post, setPost] = useState(); 

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/posts/${id}`) 
            .then((response) => response.json())
            .then((data) => setPost(data));
    }, []); 

    return (
        <div>
            {post ? ( 
                <>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <h2>Comments</h2>
                    {post.comments && post.comments.length > 0 ? (
                        <ul>
                            {post.comments.map((comment) => (
                                <li key={comment.id}>{comment.content}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No comments available for this post.</p>
                    )}
                </>
            ) : (
                <p>Post not found.</p>
            )}
        </div>
    );
};

export default Post;
